import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import './utils/amfeFlexible.js';
import request from "./request/index";
import toast from "./components/Toast/index";
import "./styles/global.scss";

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.use(request)
.use(toast)
.mount("#app");
