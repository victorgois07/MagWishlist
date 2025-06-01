import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../pages/index.page.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      component: () => import('../pages/login.page.vue'),
    },
  ],
})

export default router
