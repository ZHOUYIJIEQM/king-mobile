import request from "./index";

export default {
  /**
   * 获取赛事文章
   */
  getRaceArticle: (params: any) => {
    return request({
      url: "/race/center",
      method: "post",
      data: params,
    });
  },
};
