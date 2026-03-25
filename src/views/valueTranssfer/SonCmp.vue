<script setup lang="ts">
// import { ref } from 'vue'
import Grandson from './GrandSon.vue'
import './common.scss'
const fatherProps = defineProps<{
  fatherInputValue: string
}>()


const emit =defineEmits<{
  (event: 'fatherInputValue', value: string): void
}>()


</script>

<template>

  <div class="son">
    <div >【子组件区域】</div>
    <!-- 1.父->子 props -->
    <p class='greenTextColor'>父传子 props：{{ fatherProps.fatherInputValue }}</p>

    <div>
       <!-- 2.子传父 -->
      <!-- <button @click="$emit('fatherInputValue', Math.random())">子传父emit, 更精简的写法,只是不能做复杂逻辑</button> -->
      <button @click="emit('fatherInputValue', Math.random())">子传父emit</button>
     </div>

     <Grandson />
  </div>
</template>

<style lang='scss' scoped>
.son {
  // background-color: #f5f5f5;
  padding: 12px;
  border: 1px solid #aaa;
  border-radius: 4px;
  margin-top: 12px;
}
</style>
