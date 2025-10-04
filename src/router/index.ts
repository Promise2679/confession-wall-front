import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/pages/Login.vue'
import Comments from '@/views/pages/Comments.vue'
import Profile from '@/views/pages/Profile.vue'
import Blacklist from '@/views/pages/Blacklist.vue'
import Myposts from '@/views/pages/Myposts.vue'
import userStore from '@/stores/user'
import NotFound from '@/views/pages/404.vue'
import Rank from '@/views/pages/Rank.vue'
import Reg from '@/views/pages/Reg.vue'

// 路由注册
// 按顺序分别为首页，登录页，个人档案，黑名单，个人发布的帖子
const routes = [
  { path: '/', name: 'home', component: Comments },
  { path: '/login', name: 'login', component: Login },
  { path: '/reg', name: 'reg', component: Reg },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/rank', name: 'rank', component: Rank },
  { path: '/blacklist', name: 'blacklist', component: Blacklist },
  { path: '/mypost', name: 'mypost', component: Myposts },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 每次更换路由时，将页面滚动到顶部
  scrollBehavior() {
    return { top: 0 }
  },
})

// 导航守卫
// 包括正向和反向
router.beforeEach((to) => {
  const store = userStore()
  if (!store.isLogin && to.name !== 'login' && to.name !== 'reg') {
    return { name: 'login' }
  }
  if (store.isLogin && (to.name == 'login' || to.name == 'reg')) {
    return { name: 'home' }
  }
})

export default router
