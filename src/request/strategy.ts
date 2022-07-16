import request from "./request";

const StrategyReq = {
  /**
   * 攻略中心轮播
   */
  getBanner: () => {
    return request({
      url: '/strategy/banner'
    })
  },
  /**
   * 所有的攻略内容
   */
  getAllStrategy: () => {
    return request({
      url: '/strategy/allStrategy'
    })
  }
}

export default StrategyReq