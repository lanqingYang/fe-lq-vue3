<script setup lang="ts">
import FatherCmp from './FatherCmp.vue'
import { onMounted,onUnmounted,ref} from 'vue'
import bus from '@/utils/bus'
import { VALUE_TRANSFER_BUS_KEY } from '@/constants/busKey'
import './common.scss'
import { useValueTransferStore } from '@/stores/valueTransferStore'
import { storeToRefs } from 'pinia'
// 接收bus的值
const mittBusValue = ref('')
onMounted(()=>{
  // 4.mitt 父组件接收孙组件发送的 mitt 事件
  bus.on(VALUE_TRANSFER_BUS_KEY, (data)=>{
    mittBusValue.value = data
  })
})

onUnmounted(() => {
  // 组件卸载时，取消监听 mitt 事件，避免内存泄漏
  bus.off(VALUE_TRANSFER_BUS_KEY)
})

// 5.Pinia 传值展示，父组件通过 Pinia 接收孙组件发送的值，展示在父组件区域
const valueTransferStore = useValueTransferStore()
const { transferValue } = storeToRefs(valueTransferStore)
</script>

<template>
 <div>传值练习
 <FatherCmp />
 <Footer>
  <div>底部区域，展示全局数据</div>
  <!-- 4.mitt  -->
  <div class='redTextColor'>mitt接收内容展示：{{mittBusValue}}</div>
  <!-- 5.pinia -->
  <div class='orangeTextColor'>Pinia 接收内容展示：{{ transferValue }}</div>
 </Footer>
 </div>
</template>

<style lang='scss' scoped>
</style>
