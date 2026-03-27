import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // ========== state ==========
    const token = ref('')
    const userInfo = ref({
      name: '',
      age: 0,
      gender: ''
    })

    // ========== getters ==========
    const isLogin = computed(() => {
      return !!token.value && token.value !== ''
    })

    // ========== actions 同步 ==========
    function setToken(val: string) {
      token.value = val
    }

    function updateAge(age: number) {
      userInfo.value.age = age
    }

    function resetUser() {
      token.value = ''
      userInfo.value = { name: '', age: 0, gender: '' }
    }

    // ========== actions 异步 ==========
    async function login(account: string, pwd: string) {
      // 模拟接口请求
      await new Promise((resolve) => setTimeout(resolve, 600))

      token.value = 'TOKEN__' + Date.now()
      userInfo.value = {
        name: account,
        age: 18,
        gender: '男'
      }

      return '登录成功'
    }

    return {
      // state
      token,
      userInfo,
      // getters
      isLogin,
      // actions
      setToken,
      updateAge,
      resetUser,
      login
    }
  },
  // ========== 持久化配置 需要在main.ts中注册，本质就是将数据存到本地localstorage ==========
  // 1.直接  persist: true 全部数据持久化
  /*  {
     persist: true
   } */
  // 2. 也可以更细粒度的配置，按需选择需要持久化的字段，避免 localStorage 中存储过多无用数据. 下段数据有问题，还是会将所有state数据持久化。后面再看吧
  {
    persist: {
      key: 'user-store', // localStorage 里的键名（避免冲突）
      storage: localStorage, // 存储介质：localStorage / sessionStorage
      // ✅ 官方推荐方式
      pick: ['token', 'userInfo.name'] // 只持久化 token 字段，userInfo 不持久化
    }
  }
)
