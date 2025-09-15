import { createRouter, createWebHistory } from 'vue-router'
import main from '@/views/main.vue'
import aside from '@/views/components/aside.vue'
import userStore from '@/stores/user'

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

router.beforeEach(to => {
  const store = userStore()
  if (store.isLogin && to.name == 'login') {
    return { name: 'home' }
  }
  if (store.isLogin) {
    return true
  }
  return { name: 'login' }
})

export default router
