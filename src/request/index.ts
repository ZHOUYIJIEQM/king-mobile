import HomeReq from './home'

export default {
  install(app:any) {
    // 类似 vue2:  Vue.prototype.$http = instance
    app.config.globalProperties.$HomeReq = HomeReq
  }
};