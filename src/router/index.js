import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'today',
      component: () => import('../components/TodayWeather.vue'),
    },
    {
      path: '/week',
      name: 'week',
      component: () => import('../components/WeekWeather.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/Test.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue'),
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('../components/Comment.vue'),
    },
  ],
})

export default router
