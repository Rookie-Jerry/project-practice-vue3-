import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import http from '../src/api/index';
import router from "./router";
import "virtual:windi.css";
import store from "./store";
import './router/root'
import "nprogress/nprogress.css";
const app = createApp(App);
app.use(router);
app.use(store)
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
