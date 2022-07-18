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
  },
  /**
   * 获取英雄对应攻略
   */
  getHeroStrategy: (params: any) => {
    return request({
      url: '/strategy/heroStrategy',
      method: 'POST',
      data: params
    })
  }
}

export default StrategyReq