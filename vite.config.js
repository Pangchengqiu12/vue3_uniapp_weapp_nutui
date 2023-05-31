import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['uni-nutui'],
  },
  plugins: [uni()],
  define: { 'process.env': {} },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/global.scss";',
      },
    },
  },
})
