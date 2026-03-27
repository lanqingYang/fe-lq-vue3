<script setup lang="ts">
import {
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted
} from 'vue'

onActivated(() => {
  console.log('🔍 onActivated：keep-alive  ChildCmp组件激活')
})

onDeactivated(() => {
  console.log('🔍 onDeactivated：keep-alive ChildCmpChildCmp 组件失活')
})


onMounted(() => {
  console.log('✅ onMounted：ChildCmp 挂载完成')
})

onUnmounted(() => {
  console.log('✅ onUnmounted：ChildCmp 销毁')
})

</script>

<template>
  <div>Child Component</div>
</template>

<style lang='scss' scoped>
</style>
