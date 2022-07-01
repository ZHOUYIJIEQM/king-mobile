<template>
  <div class="home-page">
    <NavbarVue></NavbarVue>
    <div class="banner-box" v-if="firstSwiper.data.length">
      <BannerVue :swiper-data="firstSwiper.data"></BannerVue>
    </div>
    <div class="banner-loading loading-skeleton" v-else></div>
    <div class="entry-box">
      <ul class="entry-list">
        <li v-for="(item, index) in entryList.data" :key="index" :class="item.cName">
          <a :href="item.href" target="_blank">
            <i></i>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <div class="collapse-box" @click="toggleCollapseState">
        <span class="collapse-icon" :class="[isCollapse && 'down']"></span>
        <span class="text">{{ isCollapse ? "展开" : "收起" }}</span>
      </div>
    </div>
    <div class="home-content">
      <div class="cont-item">
        <div class="cont-title">
          <span class="ico_news"></span>
          <span class="text">新闻资讯</span>
          <span class="ico_more"></span>
        </div>
      </div>

      <div class="cont-item">
        <div class="cont-title">
          <span class="ico_hero"></span>
          <span class="text">英雄列表</span>
          <span class="ico_more"></span>
        </div>
      </div>

      <div class="cont-item">
        <div class="cont-title">
          <span class="ico_video"></span>
          <span class="text">精彩视频</span>
          <span class="ico_more"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, reactive, ref } from "vue";
import BannerVue from "../components/Banner.vue";
import NavbarVue from "../components/Navbar.vue";
const app: any = getCurrentInstance();
const homeReq = app.appContext.config.globalProperties.$HomeReq;

interface SwiperDataType {
  img: string;
  url: string;
}
// 第一个轮播
// let firstSwiper = []
let firstSwiper = reactive({
  data: [] as Array<SwiperDataType>,
});
const getFirstSwiper = async () => {
  let res = await homeReq.getAds();
  if (res.status === 200) {
    firstSwiper.data = res.data.items;
  }
};
getFirstSwiper();

// 中间多个入口图标
interface EntryListType {
  href: string;
  name: string;
  cName: string;
}
const EntryListFull: Array<EntryListType> = [
  {
    href: "https://pvp.qq.com/m/m201706/coming/index.htm",
    name: "爆料站",
    cName: "blz",
  },
  {
    href: "https://pvp.qq.com/act/a20160510story/index.htm?ADTAG=PC.QrCode.TG",
    name: "故事站",
    cName: "gsz",
  },
  {
    href: "https://pvp.qq.com/mall/m",
    name: "周边商城",
    cName: "zbsc",
  },
  {
    href: "https://pvp.qq.com/cp/a20161116tyf/page01.htm",
    name: "体验服",
    cName: "tyf",
  },
  {
    href: "https://pvp.qq.com/m/m201606/goCenter.shtml",
    name: "新人专区",
    cName: "xrzq",
  },
  {
    href: "https:https://pvp.qq.com/m/memory/index.shtml",
    name: "荣耀·传承",
    cName: "whz",
  },
  {
    href: "https://image.ttwz.qq.com/wzry/wzryzs_download_4001.htm?ADTAG=mpvp.qq.com",
    name: "王者营地",
    cName: "zs",
  },
  {
    href:
      "https://game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90102708&appid=wx95a3a4d7c627e07d&url=https%3A%2F%2Fgame.weixin.qq.com%2Fcgi-bin%2Fh5%2Fstatic%2Fsubscribe%2Findex.html%3Fappid%3Dwx95a3a4d7c627e07d#wechat_redirect",
    name: "公众号",
    cName: "gzh",
  },
  {
    href: "https://pvp.qq.com/cp/a20190320bbgxsmm/index.html",
    name: "版本介绍",
    cName: "bbjs",
  },
  {
    href: "https://pvp.qq.com/cp/a20190917station/index.html",
    name: "对局环境",
    cName: "djhj",
  },
  {
    href: "https://pvp.qq.com/cp/a20210428ipgc",
    name: "IP共创计划",
    cName: "ipgc",
  },
  {
    href: "https://pvp.qq.com/m/hdy/p1/index.html",
    name: "创意互动营",
    cName: "cyhdy",
  },
];
let entryList = reactive({
  data: [] as EntryListType[],
});
// entryList.data = EntryListFull
entryList.data = EntryListFull.slice(0, 4);
// 是否折叠状态
let isCollapse = ref<boolean>(true);
const toggleCollapseState = () => {
  if (isCollapse.value) {
    entryList.data = EntryListFull;
  } else {
    entryList.data = EntryListFull.slice(0, 4);
  }
  isCollapse.value = !isCollapse.value;
};
</script>
<style lang="scss" scoped>
.home-page {
  .banner-box,
  .banner-loading {
    height: 4.4rem;
  }

  .entry-box {
    .entry-list {
      font-size: 0.32rem;
      display: flex;
      flex-wrap: wrap;
      margin: 0.1333rem 0;
      li {
        text-align: center;
        height: 1.8667rem;
        width: 25%;
        padding: 0.2667rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &:nth-child(4n + 4) {
          a::after {
            border: 0;
          }
        }

        a {
          display: block;
          height: 100%;
          text-decoration: none;
          color: #222;
          position: relative;

          &::after {
            position: absolute;
            right: 0;
            top: 0;
            content: "";
            display: block;
            height: 100%;
            border-right: 0.0533rem solid #d4d9de;
          }

          i {
            display: block;
            height: 100%;
            width: 100%;
            background: url("../assets/index.png") no-repeat;
            background-size: 10rem;
          }

          span {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
          }
        }
      }

      .blz i {
        background-position: -5.0133rem -1.58rem;
      }

      .gsz i {
        background-position: -7.6rem -1.58rem;
      }

      .lywzk i {
        background-position: -1.85rem -8.2rem;
      }

      .zbsc i {
        background-position: -2.5333rem 0.05rem;
      }

      .tyf i {
        background-position: 0.04rem -1.58rem;
      }

      .xrzq i {
        background-position: -7.5467rem 0.05rem;
      }

      .whz i {
        background-position: -2.5333rem -1.58rem;
      }

      .trz i {
        background-position: 0 0.08rem;
      }

      .zs i {
        background-position: -5.0133rem 0.05rem;
      }

      .gzh i {
        background-position: 0.9333rem -10.9rem;
      }

      .bbjs i {
        background: url(//game.gtimg.cn/images/yxzj/m/m201706/images/bg/version-icon.png)
          0.96rem 0.18rem no-repeat;
        background-size: 0.65rem;
      }

      .djhj i {
        background: url(//game.gtimg.cn/images/yxzj/m/m201706/images/bg/djhj.png) 0.7rem
          0.15rem no-repeat;
        background-size: 1.05rem;
      }

      .ipgc i {
        background: url(//game.gtimg.cn/images/yxzj/m/m201706/images/bg/ipgc.png) 0.8rem
          0.05rem no-repeat;
        background-size: 0.85rem;
      }

      .cyhdy i {
        background: url(//game.gtimg.cn/images/yxzj/m/m201706/images/bg/cyhdy.png) 0.85rem
          0.1rem no-repeat;
        background-size: 0.75rem;
      }
    }

    .collapse-box {
      height: 0.8rem;
      background-color: #f9f9f9;
      display: flex;
      align-items: center;
      justify-content: center;

      .collapse-icon {
        &.down {
          transform: rotate(180deg);
        }

        display: inline-block;
        width: 0.3733rem;
        height: 100%;
        background: url(/src/assets/index.png) no-repeat;
        background-size: 10rem;
        background-position: -3.7333rem -5.92rem;
      }

      .text {
        margin-left: 5px;
        font-size: 0.32rem;
      }
    }
  }

  .home-content {
    background-color: #f3f3f3;
    .cont-item {
      background-color: #fff;
      margin-bottom: 0.32rem;
      border-bottom: 1px solid #d4d9de;
      .cont-title {
        display: flex;
        align-items: center;
        padding: 0.4rem 0;
        margin: 0 0.4rem;
        border-bottom: 1px solid #eaedef;
        .ico_news {
          height: 0.48rem;
          background-position: 0.0533rem -5.8667rem;
        }
        .ico_hero {
          height: 0.4rem;
          background-position: -4.5rem -7.1rem;
        }
        .ico_video {
          height: 0.4rem;
          background-position: 0 -6.6667rem;
        }
        .ico_more {
          height: 0.5333rem;
          background-position: -4.49rem -6.5867rem;
          margin-left: auto;
        }
        & > .text {
          font-size: 0.4267rem;
          margin-left: 0.1333rem;
        }
      }
    }
  }

  .ico_news,
  .ico_hero,
  .ico_video,
  .ico_more {
    aspect-ratio: 1;
    background: url("../assets/index.png") no-repeat;
    background-size: 10rem;
    display: inline-block;
  }
}
</style>
