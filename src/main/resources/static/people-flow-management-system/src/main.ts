import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "./router"
import * as echarts from "echarts";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'

// createApp(App)
// .use(ElementPlus)
// .use(router)
// .mount('#app')
const app = createApp(App)
const pinia = createPinia()
// app.config.globalProperties.$echarts = echarts;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(ElementPlus).use(pinia).mount('#app');