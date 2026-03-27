import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
// 数据持久化，本质是将数据存到本地localstorage，刷新页面后数据不会丢失（会从本地再取回来）
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)


app.mount('#app')
