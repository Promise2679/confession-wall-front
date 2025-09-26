import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

// 用户全局存储信息
// 包括用户名，登录状态，token，字体大小和主题色
const userStore = defineStore('user', () => {
  const userid = useStorage('user-id', null)
  const username = useStorage('username', '')
  const token = useStorage('token', '')
  const color = useStorage('color', 0)
  const avatar = useStorage('avatar', './src/asset/default_avatar.webp')
  const fontSize = useStorage('font-size', 1)
  const isLogin = ref(true)

  const $reset = () => {
    userid.value = null
    username.value = ''
    avatar.value = './src/asset/default_avatar.webp'
    isLogin.value = false
    token.value = ''
  }

  return { username, isLogin, userid, token, color, fontSize, avatar, $reset }
})

export default userStore
