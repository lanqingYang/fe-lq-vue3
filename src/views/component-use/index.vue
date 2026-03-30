<script setup lang="ts">
import { ref } from 'vue';
import LoginBox from './LoginBox.vue';
// 控制显示/隐藏，测试 keep-alive 缓存
const showLogin = ref(true)

function handleLogin() {
  alert('登录成功！')
}

</script>

<template>
  <!-- 组件进阶 1.defineOptions、keep-alive + include 验证 defineOptions的name属性 2.useAttrs、3.自定义指令、4.渲染函数h() -->
   <div>
      <h2>组件进阶</h2>

    <button @click="showLogin = !showLogin">
      显示/隐藏登录框（测试缓存）
    </button>
        <p>组件进阶：1.defineOptions、keep-alive + include 验证 defineOptions的name属性 2.useAttrs、3.自定义指令、4.渲染函数h()</p>
        <!--keep-alive  exclude属性为 排除-->
        <keep-alive :include="['LoginBox']">
        <LoginBox
        v-if="showLogin"
        type="text"
        title="登录组件"
        @login-success="handleLogin"
        ></LoginBox>
        </keep-alive>
   </div>
</template>

<style lang='scss' scoped>
</style>
