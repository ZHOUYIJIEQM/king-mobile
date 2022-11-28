import request from "./index";

export default {
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
  getShortnews: () => {
    return request({
      url: "/home/shortNews",
    });
  },

  /**
   * 英雄列表轮播
   */
  getHeroBanner: () => {
    return request({
      url: "/home/heroListBanner",
    });
  },

  /**
   * 获取英雄列表
   */
  getHeroList: () => {
    return request({
      url: "/home/heroList",
    });
  },

  /**
   * 首页精彩视频
   */
  getHighLigthVdo: () => {
    return request({
      url: "/home/highlightVdo",
    });
  },
};
