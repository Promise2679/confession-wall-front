import { ref } from 'vue'
import { defineStore } from 'pinia'

const userStore = defineStore('user', () => {
  const username = ref('1114')
  const isLogin = ref(true)

  return { username, isLogin }
})

export default userStore
