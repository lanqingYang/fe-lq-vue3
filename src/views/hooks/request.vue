<script setup>
import { useRequest } from '@/hooks/useRequest'
import { onMounted} from 'vue'

// 1. 调用 useRequest，传入接口地址和请求选项
const { data, loading, error, request } = useRequest('/api/user/list', {
  method: 'GET',
  params: { page: 1, size: 10 } // GET 参数
})

// 2. 组件挂载时，自动发起请求
onMounted(() => {
  request()
})

// 3. 手动刷新（比如点击“刷新按钮”）
const refresh = () => {
  request()
}
</script>

<template>
  <div>
    <h3>用户列表 挂载时即请求</h3>
    <!-- 加载中状态 -->
    <div v-if="loading">加载中...</div>
    <!-- 错误提示 -->
    <div v-else-if="error" style="color: red">{{ error }}</div>
    <!-- 成功渲染数据 -->
    <div v-else>
      <div >data值：{{ data }}</div>
      <div v-for="item in data?.list" :key="item.id">
        {{ item.id }} - {{ item.name }}
      </div>
      <div>总条数：{{ data?.total }}</div>
    </div>
    <button @click="refresh" :disabled="loading">刷新列表</button>
  </div>
</template>
