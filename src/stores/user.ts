import { ref } from 'vue'
import { defineStore } from 'pinia'

// 用户全局存储信息
// 包括用户名，登录状态，token，字体大小和主题色
const userStore = defineStore('user', () => {
  const userid = ref(null)
  const username = ref('')
  const isLogin = ref(false)
  const token = ref('')
  const color = ref(0)
  const fontSize = ref(1)

  return { username, isLogin, userid, token, color, fontSize }
})

export default userStore
