// 全局导入部分
// 包括 vue, pinia, router 等

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faThumbsUp, faTriangleExclamation, faXmark, faPen, faCommentDots, faEye } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

// 引入 element plus 图标库
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

// 按需引入 font awesome 图标
library.add(faThumbsUp, faTriangleExclamation, faXmark, faPen, faCommentDots, faEye)
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
