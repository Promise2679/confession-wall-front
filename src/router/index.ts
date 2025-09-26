import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/pages/login.vue'
import Comments from '@/views/pages/comments.vue'
import Profile from '@/views/pages/profile.vue'
import Blacklist from '@/views/pages/blacklist.vue'
import Myposts from '@/views/pages/myposts.vue'
import userStore from '@/stores/user'
import NotFound from '@/views/pages/404.vue'

// 路由注册
// 按顺序分别为首页，登录页，个人档案，黑名单，个人发布的帖子
const routes = [
  { path: '/', name: 'home', component: Comments },
  { path: '/login', name: 'login', component: Login },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/blacklist', name: 'blacklist', component: Blacklist },
  { path: '/mypost', name: 'mypost', component: Myposts },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 导航守卫
// 包括正向和反向
router.beforeEach((to) => {
  const store = userStore()
  if (!store.isLogin && to.name !== 'login') {
    return { name: 'login' }
  }
  if (store.isLogin && to.name == 'login') {
    return { name: 'home' }
  }
})

export default router
