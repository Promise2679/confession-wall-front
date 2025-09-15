import { createRouter, createWebHistory } from 'vue-router'
import main from '@/views/main.vue'
import aside from '@/views/components/aside.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: main,
  },
  {
    path: '/aside',
    name: 'aside',
    component: aside,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
