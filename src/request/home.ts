import request from "./request";

const HomeReq = {
  /**
   * 获取首页轮播
   */
  getAds: () => {
    return request({
      url: "/home/ads",
    });
  },
  /**
   * 新闻 公告 ...
   */
  getNews: () => {
    return request({
      url: "/homw/news",
    });
  },
};

export default HomeReq
