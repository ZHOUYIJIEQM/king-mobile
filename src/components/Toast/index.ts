import { createApp } from "vue";
import Toast from "./index.vue";

export default {
  install(app: any) {
    let toastBox = document.createElement("div");
    document.body.appendChild(toastBox)
    const toastInstance: any = createApp(Toast).mount(toastBox)
    app.config.globalProperties.$toast = toastInstance.ToastShow
  },
};
