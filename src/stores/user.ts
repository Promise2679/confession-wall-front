import { ref } from 'vue'
import { defineStore } from 'pinia'

const userStore = defineStore('user', () => {
  const username = ref('')
  const isLogin = ref(true)

  return { username, isLogin }
})

export default userStore
