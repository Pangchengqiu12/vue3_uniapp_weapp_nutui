import { createSSRApp } from 'vue'
import App from './App.vue'
import custom from './components/custom/custom.vue'
import util from './utils/util.js'
export function createApp() {
  const app = createSSRApp(App)
  app.use(util)
  app.component('custom', custom)
  return {
    app,
  }
}
