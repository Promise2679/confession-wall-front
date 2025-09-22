import { ref } from 'vue'
import { defineStore } from 'pinia'

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
