<script setup lang="ts">
import { ref ,provide} from 'vue'
import SonCmp from './SonCmp.vue'
import { GRANDPA_MSG } from '@/constants/provideKey'
import './common.scss'
// v-model 双向绑定的值
const fatherInputValue = ref('')
// 子传父的值
const sonToFatherEmitValue = ref('')
// provide 爷孙传值
const grandpaMsg = ref('初始值')
provide(GRANDPA_MSG, grandpaMsg)



</script>

<template>
 <div class="father">
  <div >【父组件区域】</div>
  <!-- 6.v-model双向绑定 -->
  <p >父组件输入框内容v-model 双向绑定：{{ fatherInputValue }}</p>
  <input v-model="fatherInputValue" placeholder="父组件输入框" />

  <!-- 1.父->子 props   2.子传父 emit: @fatherInputValue -->
  <SonCmp :fatherInputValue="fatherInputValue"  @fatherInputValue="sonToFatherEmitValue = $event" />

  <!-- 2.子传父 emit -->
   <p class='greenTextColor'>子组件传值给父组件：{{ sonToFatherEmitValue }}</p>

   <!-- 3.爷孙传值 provide /inject 注意provide 和 inject不能写在模板template中-->
    <div>
      <span class='pinkTextColor'>点击后，孙组件通过 inject 接收爷组件 provide 的值，展示在父组件区域:</span>
      <button @click="grandpaMsg = Math.random()">provide值修改</button>
    </div>
 </div>
</template>

<style lang='scss' scoped>
.father {
  // background-color: #f5f5f5;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
