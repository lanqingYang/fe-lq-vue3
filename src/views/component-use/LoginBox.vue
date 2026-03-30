<script setup lang="ts">
import { useAttrs,h} from 'vue'

// 1.defineOptions 定义组件选项，配合 name 属性验证 keep-alive include 的缓存,
// 组件选项：inheritAttrs（是否将父组件传入的属性自动应用到组件根元素上，默认为 true
defineOptions({
  name: 'LoginBox',
  inheritAttrs: false
})

const emit = defineEmits(['login-success'])

const { title } = defineProps({ title: String })

function handleLogin() {
  // 登录成功后，触发 login-success 事件
  emit('login-success')
}

//  组件进阶：useAttrs（获取父组件传入的属性，配合 inheritAttrs: false 实现自定义属性透传) 或者直接通过在组件根元素上使用 v-bind="$attrs" 将所有属性透传到指定元素上
const attrs = useAttrs()

// 3.z自定义指令 v-focus，登录框输入框自动获取焦点
const vFocus = {
  mounted(el: HTMLInputElement) {
    el.focus()
  },
}

// 4.渲染函数 h() 定义一个组件内部的渲染函数，渲染一个提示信息
const renderTip = () => h('div', { class: 'tip' }, '请输入账号密码,h函数渲染提示信息')


</script>


<template>
  <div class="login-box">
    <h2>{{ title }} </h2>
    <!-- $attrs 将透传的 type='text' 放到 input组件上，前提是需要阻止默认挂到根组件div ，  inheritAttrs: false -->
    <input
      v-focus
      v-bind="attrs"
      placeholder="请输入账号"
      class="input"
    >
    <renderTip />
    <button @click="handleLogin" class="btn">登录</button>
  </div>
</template>

<style scoped>
.login-box {
  border: 1px solid #ddd;
  padding: 20px;
  width: 300px;
  margin: 20px;
}
.input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
}
.btn {
  background: #42b983;
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}
.tip {
  color: #666;
  font-size: 12px;
}
</style>
