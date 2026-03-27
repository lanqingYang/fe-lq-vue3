<script setup>
import { userStore } from '@/stores'
import { storeToRefs } from 'pinia'

// 解构保持响应式
const { token, userInfo, isLogin } = storeToRefs(userStore)

// 1. 异步登录
async function handleLogin() {
  const msg = await userStore.login('admin', '123456')
  alert(msg)
}

// 2. 批量修改 $patch
function handlePatch() {
  userStore.$patch({
    userInfo: {
      name: '张三',
      age: 25,
      gender: '女'
    }
  })
}

// 3. 单独修改 age
function handleUpdateAge() {
  userStore.updateAge(30)
}

// 4. 退出登录
function handleLogout() {
  userStore.resetUser()
  alert('已退出')
}
</script>

<template>
  <div style="max-width: 600px; margin: 30px auto; padding: 0 16px;">
    <h2>Pinia 完整综合案例</h2>

    <div style="margin: 20px 0; line-height: 2;">
      <div><b>登录状态：</b>{{ isLogin ? '✅ 已登录' : '❌ 未登录' }}</div>
      <div><b>Token：</b>{{ token || '空' }}</div>
      <div><b>用户名：</b>{{ userInfo.name || '空' }}</div>
      <div><b>年龄：</b>{{ userInfo.age || 0 }}</div>
      <div><b>性别：</b>{{ userInfo.gender || '空' }}</div>
    </div>

    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
      <button @click="handleLogin">模拟登录（异步）</button>
      <button @click="handlePatch">$patch 批量修改</button>
      <button @click="handleUpdateAge">修改年龄</button>
      <button @click="handleLogout" style="color: red">退出登录</button>
    </div>

    <p style="margin-top: 20px; color:#666">
      刷新页面测试：数据依然存在 → persist 持久化生效
    </p>
  </div>
</template>
