import request from "./request";

export default {
  /**
   * 获取文章 | 视频 | 英雄详情
   * params: {query, type}
   */
  getResources(params: any) {
    return request({
      url: '/resources/resource',
      method: 'POST',
      data: params
    })
  },
}