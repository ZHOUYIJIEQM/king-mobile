import { createApp } from "vue"
import NewToast from "./index.vue"
 
export default {
  toast: null,
  install(app) {
    console.log('-----', this);
    if (this.toast) {
      // 防止多次载入
      app.config.globalProperties.$toast = this.toast
      return
    }
    // 创建toast实例，用于挂载
    let instance = createApp(NewToast)
    // 创建div元素装载toast对象
    let div = document.createElement("div")
    let body = document.body
    // 导入body中
    body.appendChild(div)
    this.toast = instance.mount(div)
    // 挂载vue身上
    app.config.globalProperties.$toast = this.toast;
  }
}