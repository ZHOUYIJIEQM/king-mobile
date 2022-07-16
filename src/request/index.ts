import HomeReq from './home'
import StrategyReq from './strategy'

export default {
  install(app:any) {
    // 类似 vue2:  Vue.prototype.$http = instance
    app.config.globalProperties.$HomeReq = HomeReq
    app.config.globalProperties.$StrategyReq = StrategyReq
  }
};