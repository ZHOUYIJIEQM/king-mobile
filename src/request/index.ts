import HomeReq from './home'
import StrategyReq from './strategy'
import Resources from './resource'
import Race from './race'

export default {
  install(app: any) {
    // 类似 vue2:  Vue.prototype.$http = instance
    app.config.globalProperties.$HomeReq = HomeReq
    app.config.globalProperties.$StrategyReq = StrategyReq
    app.config.globalProperties.$Resources = Resources
    app.config.globalProperties.$Race = Race
  }
};