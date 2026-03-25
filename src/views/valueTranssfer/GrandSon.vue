<script setup lang="ts">
import {inject} from 'vue'
import { GRANDPA_MSG } from '@/constants/provideKey'
import './common.scss'
import bus from '@/utils/bus'
import { VALUE_TRANSFER_BUS_KEY } from '@/constants/busKey'
import { useValueTransferStore } from '@/stores/valueTransferStore'
// inject 只能在 setup 中使用,所以孙组件通过 inject 接收爷组件 provide 的值，展示在父组件区域的功能，放在孙组件中实现了
const provideValue = inject(GRANDPA_MSG)

// 5.pinia 修改数据
const {setTransferValue} = useValueTransferStore()
</script>

<template>
 <div class="grandson">
   <div >【孙组件区域】</div>
   <!-- 3.爷孙传值 provide /inject -->
   <p class='pinkTextColor'>孙组件通过 inject 接收爷组件 provide 的值：{{provideValue }}</p>

   <div>
    <!-- 4.mitt 发送内容 -->
     <span class='redTextColor'>点击后，孙组件通过 mitt 发送事件，根组件接收展示</span>
      <button @click="()=>bus.emit(VALUE_TRANSFER_BUS_KEY, Math.random())">发送mitt事件</button>
   </div>

   <div>
    <!-- 5.pinia 修改传值-->
     <span class='orangeTextColor'>点击后，孙组件通过 pinia 修改传值，index根组件接收展示</span>
      <button @click="()=>setTransferValue(Math.random())">修改Pinia值</button>
   </div>
 </div>
</template>

<style lang='scss' scoped>
.grandson {
  // background-color: #f5f5f5;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 12px;
}
</style>
