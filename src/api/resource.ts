import request from "./index";

interface queryParams {
  name?: string,
  id?: string,
  type: string
}

export default {
  /**
   * 获取文章 | 视频 | 英雄详情
   * params: {query, type}
   */
  getResources: (params: queryParams) => {
    return request({
      url: "/resources/resource",
      method: "post",
      data: params,
    });
  },
};
