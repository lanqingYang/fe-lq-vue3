<script setup lang="ts">
import {
  ref,

  // ========== 【常用 4 个】 ==========
  onBeforeMount,
  onMounted,
  onUpdated,
  onUnmounted,

  // ========== 【了解 5 个】 ==========
  onBeforeUpdate,
  onBeforeUnmount,
  onErrorCaptured
} from 'vue'
import ChildCmp from './ChildCmp.vue'
import ChildCmp2 from './ChildCmp2.vue'
const show = ref(true)
const count = ref(0)
const timer = ref<ReturnType<typeof setInterval> | null>(null)

const curCmp= ref()

// ==================================
// 【常用】
// ==================================
onBeforeMount(() => {
  console.log('✅ onBeforeMount：挂载前，DOM 还没生成')
})

onMounted(() => {
  console.log('✅ onMounted：挂载完成 → 请求接口、开定时器')
  timer.value = setInterval(() => count.value++, 1000)
  curCmp.value=ChildCmp
})

onUpdated(() => {
  console.log('✅ onUpdated：视图更新完成')
})

onUnmounted(() => {
  console.log('✅ onUnmounted：组件销毁 → 清理定时器')
 timer.value? clearInterval(timer.value): null
})

// ==================================
// 【了解】
// ==================================
onBeforeUpdate(() => {
  console.log('🔍 onBeforeUpdate：数据更新，视图更新前')
})

onBeforeUnmount(() => {
  console.log('🔍 onBeforeUnmount：销毁前，还能访问组件')
})

// ====在ChildCmp.vue中演示 keep-alive 组件的 onActivated 和 onDeactivated 钩子====
// onActivated(() => {
//   console.log('🔍 onActivated：keep-alive 组件激活')
// })

// onDeactivated(() => {
//   console.log('🔍 onDeactivated：keep-alive 组件失活')
// })

onErrorCaptured(() => {
  console.log('🔍 onErrorCaptured：捕获子组件错误')
})
</script>

<template>
  <div style="padding: 20px;">
    <h2>Vue3 全生命周期钩子</h2>
    <button @click="show = !show">显示/隐藏（v-if 销毁重建）</button>
    <button @click="count++">更新数据（触发更新生命周期）</button>

    <div v-if="show">
      <h4>当前计数：{{ count }}</h4>
      <p>打开控制台 F12 看生命周期执行顺序</p>
    </div>

    <button @click="curCmp=ChildCmp">切换keep-alive当前组件为childCmp </button>
    <button @click="curCmp=ChildCmp2">切换keep-alive当前组件为childCmp 22 </button>

    <div><keep-alive>
      <component :is="curCmp"></component>
    </keep-alive></div>
  </div>
</template>
