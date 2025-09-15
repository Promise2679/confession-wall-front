import { createRouter, createWebHistory } from 'vue-router'
import main from '@/views/main.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: main,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
