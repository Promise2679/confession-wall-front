import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/pages/login.vue'
import Comments from '@/views/pages/comments.vue'
import userStore from '@/stores/user'
import Profile from '@/views/pages/profile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Comments,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(to => {
  const store = userStore()
  if (!store.isLogin && to.name !== 'login') {
    return { name: 'login' }
  }
  if (store.isLogin && to.name == 'login') {
    return { name: 'home' }
  }
})

export default router
