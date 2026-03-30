<script setup>
// 1. 导入自定义 Hooks
import { useCountDown } from '@/hooks/useCountDown'

// 2. 调用 Hooks，传入初始倒计时（60秒）
const { time, start, reset ,stop} = useCountDown(60)

// 发送验证码（调用倒计时）
const sendCode = () => {
  reset() // 重置倒计时
  start() // 启动倒计时
  // 这里可以加发送验证码的接口请求逻辑
}
</script>

<template>
  <div>
    <button @click="sendCode" :disabled="time < 60 && time > 0">
      {{ time === 60 ? '发送验证码' : `${time}秒后重新发送` }}
    </button>
     <button @click="stop" >
      停止倒计时
    </button>
      <button @click="start()" >
      开始倒计时
    </button>
  </div>

</template>
