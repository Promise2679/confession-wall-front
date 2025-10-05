import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  // 设置路径别名
  // 令 @ 导向 src 文件夹
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 设置代理
  // 为 /api 开头的字符串自动添加前缀
  server: {
    proxy: {
      '/api': {
        target: '121.5.15.69:8080',
        changeOrigin: true,
      }
    }
  }
})
