import axios from 'axios'
import userStore from '@/stores/user'
import { ElNotification } from 'element-plus'

// 给请求添加 token
// 若无 token 则直接放行
axios.interceptors.request.use(
  (config) => {
    const token = userStore().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 全局错误处理
// axios.interceptors.response.use(
//   (res) => {
//     if (res.data.code === 200) {
//       return res
//     }
//     ElNotification({ message: res.data.msg, type: 'error', duration: 1500 })
//     return Promise.reject(res.data.msg)
//   },
//   (err) => {
//     ElNotification({ message: err, type: 'error', duration: 1500 })
//     return Promise.reject(err)
//   },
// )

export default axios
