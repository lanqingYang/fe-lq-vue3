import { onUnmounted, ref } from "vue"

// 初始化倒计时时间
const INITIAL_TIME = 60
// 倒计时
export function useCountDown(initialTime: number = INITIAL_TIME) {

  // 倒计时时间
  const time = ref(initialTime)
  // 定时器
  let timer: NodeJS.Timeout | null = null
  // 是否正在倒计时
  const isRunning = ref(false)

  // 1. 开始倒计时
  const start = () => {
    if (isRunning.value) return
    isRunning.value = true
    timer = window.setInterval(() => {
      if ((time.value) > 0) {
        time.value -= 1
      } else {
        stop()
      }
    }, 1000)
  }

  // 2. 停止倒计时
  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    isRunning.value = false
  }

  // 3. 重置倒计时
  const reset = (newTime?: number) => {
    stop()
    time.value = newTime ?? INITIAL_TIME
  }

  // 组件卸载时清除定时器, 尽量写!避免组件卸载后(忘记调用stop)定时器还在运行，造成内存泄漏.双重保险
  onUnmounted(() => {
    stop()
  })

  return {
    time,
    isRunning,
    start,
    stop,
    reset
  }

}
