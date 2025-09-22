import axios from "axios";
import userStore from '@/stores/user';

// 给请求添加 token
// 若无 token 则放行
axios.interceptors.request.use(config => {
    const token = userStore().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => Promise.reject(error))

export default axios
