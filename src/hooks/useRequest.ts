// src/hooks/useRequest.ts
import { ref, onUnmounted } from 'vue'
import axios from 'axios' // 项目中常用 axios，也可替换为 fetch

// 定义请求选项类型（TS 类型约束，避免传参错误）
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' // 请求方法
  headers?: Record<string, string> // 请求头
  params?: Record<string, any> // GET 参数
  data?: Record<string, any> // POST/PUT 数据
}

// 自定义 Hooks：接口请求复用
export function useRequest<T = any>(url: string, options?: RequestOptions) {
  // 1. 定义 Hooks 内部状态（对外暴露）
  const data = ref<T | null>(null) // 请求成功返回的数据
  const loading = ref(false) // 加载中状态
  const error = ref<string | null>(null) // 错误信息

  // 2. 请求取消控制器（用于组件卸载时取消请求）
  let abortController: AbortController | null = null

  // 3. 核心逻辑：发起请求
  const request = async () => {
    // 重置状态
    loading.value = true
    error.value = null
    data.value = null

    // 防止重复请求（如果已有未完成的请求，先取消）
    if (abortController) {
      abortController.abort()
    }
    abortController = new AbortController()
    try {
      // 发起请求（适配 axios，可替换为 fetch）
      const response = await axios({
        url,
        method: options?.method || 'GET',
        headers: options?.headers || {},
        params: options?.params || {},
        data: options?.data || {},
        signal: abortController.signal // 关联取消控制器
      })

      // 请求成功，赋值数据
      data.value = response.data
      return response.data // 允许组件获取返回值
    } catch (err: any) {
      // 处理错误（区分“取消请求”和“真实错误”）
      if (err.name === 'CanceledError') {
        error.value = '请求已取消'
      } else {
        error.value = err.message || '接口请求失败，请稍后再试'
      }
      return null
    } finally {
      // 请求结束，关闭 loading（无论成功/失败）
      loading.value = false
    }
  }

  // 4. 核心逻辑：取消请求（对外暴露，组件可手动调用）
  const cancelRequest = () => {
    if (abortController) {
      abortController.abort()
      abortController = null
      loading.value = false
      error.value = '请求已取消'
    }
  }

  // 5. 兜底保障：组件卸载时，自动取消请求（防内存泄漏）
  onUnmounted(() => {
    cancelRequest()
  })

  // 6. 对外暴露：组件需要用到的状态和方法
  return {
    data,
    loading,
    error,
    request, // 手动发起请求
    cancelRequest // 手动取消请求
  }
}
