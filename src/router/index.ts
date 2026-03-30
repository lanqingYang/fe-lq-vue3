import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // 传值
    {
      path: '/value-transfer',
      name: 'value-transfer',
      component: () => import('../views/valueTranssfer/index.vue'),
    },
    // 响应式核心
    {
      path: '/response',
      name: 'response',
      component: () => import('../views/response/index.vue'),
    },
    // 响应式核心
    {
      path: '/template-and-directive',
      name: 'template-and-directive',
      component: () => import('../views/templateAndDirective/index.vue'),
    },
    // 生命周期
    {
      path: '/life-circle',
      name: 'life-circle',
      component: () => import('../views/lifeCircle/index.vue'),
    },
    // pinia
    {
      path: '/pinia',
      name: 'pinia',
      component: () => import('../views/pinia/index.vue'),
    },
    ,
    // hooks 1 倒计时
    {
      path: '/hooks',
      name: 'hooks',
      component: () => import('../views/hooks/index.vue'),
    },
    // hooks 2 request
    {
      path: '/hook-request',
      name: 'hook-request',
      component: () => import('../views/hooks/request.vue'),
    },
    // 组件进阶
    {
      path: '/component-advanced',
      name: 'component-advanced',
      component: () => import('../views/component-use/index.vue'),
    }
  ],
})

export default router
