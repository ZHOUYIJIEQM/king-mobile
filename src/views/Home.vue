<template>
  <KeepScrollVue>
    <div class="home-page">
      <BannerVue :swiper-data="firstSwiper.data"></BannerVue>
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
        <div class="cont-item news">
          <div class="cont-title">
            <span class="ico_news"></span>
            <span class="text">新闻资讯</span>
            <span class="ico_more"></span>
          </div>
          <template v-if="newsSwiper.data.length">
            <NavBannerVue :navSwiperData="newsSwiper.data">
              <!-- <template #title="slotProps">
                <div class="title-inner-box">
                  <span 
                    v-for="(i, j) in slotProps.swiperTitle" 
                    :key="j"
                    :class="{active: j === activeIndex}"
                    @click="changeActive(j, slotProps.swiperEl)"
                  >{{ i }}</span>
                </div>
              </template> -->
              <template #slideItem="slotProps">
                <div class="swiperItem-box">
                  <div 
                    class="news-item" 
                    v-for="(i, j) in slotProps.swiperItem.dataList" 
                    :key="j"
                  >
                    <div class="flag" :style="{borderColor: borderColor.get(slotProps.swiperItem.name), color: borderColor.get(slotProps.swiperItem.name)}">{{slotProps.swiperItem.name}}</div>
                    <div class="text eli">{{i.title}}</div>
                    <div class="date">{{formatDate(i.createTime)}}</div>
                  </div>
                </div>
              </template>
            </NavBannerVue>
          </template>
          <template v-else>
            <div :style="{ height: '6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }" >
              正在加载...
            </div>
          </template>
        </div>

        <div class="cont-item heros">
          <div class="cont-title">
            <span class="ico_hero"></span>
            <span class="text">英雄列表</span>
            <span class="ico_more"></span>
          </div>
          <div class="hero-banner-box">
            <BannerVue :swiper-data="heroBanner.data"></BannerVue>
          </div>
          <div class="hero-list-box">
            <template v-if="heroList.data.length">
              <NavBannerVue :navSwiperData="heroList.data">
                <template #slideItem="slotProps">
                  <div class="hero-list">
                    <div 
                      class="hero-item"
                      v-for="(i, j) in slotProps.swiperItem.dataList"
                      :key="j"
                    >
                      <img :src="i.avatar" alt="">
                      <p>{{i.name}}</p>
                    </div>
                  </div>
                </template>
              </NavBannerVue>
            </template>
            <template v-else>
              <div :style="{ height: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }" >
                正在加载...
              </div>
            </template>
          </div>
        </div>

        <div class="cont-item vdo-hot">
          <div class="cont-title">
            <span class="ico_video"></span>
            <span class="text">精彩视频</span>
            <span class="ico_more"></span>
          </div>
          <div class="highvdo-box">
            <div class="vdo-item-box"
              v-for="(item, index) in highVdo.data"
              :key="index"
            >
              <VideoInfoVue :video-info="item"></VideoInfoVue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </KeepScrollVue>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import BannerVue from "../components/Banner.vue";
import NavBannerVue from "../components/NavBanner.vue";
import VideoInfoVue from "../components/VideoInfo.vue";
import KeepScrollVue from '../components/KeepScroll.vue'

const app: any = getCurrentInstance();
const homeReq = app.proxy.$HomeReq;

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


// 新闻资讯
let newsSwiper = reactive({
  data: [],
});
/**
 * 新闻资讯
 */
const getShortNews = async () => {
  try {
    let res = await homeReq.getShortnews();
    if (res.status === 200) {
      // console.log('新闻资讯', res.data);
      newsSwiper.data = res.data;
    }
  } catch (error) {
    console.log(error);
    console.log('新闻资讯');
  }
};


/**
 * 边框颜色
 */
const borderColor = new Map([
  ['热门', '#ff3636'],
  ['新闻', '#1e96ab'],
  ['广告', '#f09a37'],
  ['活动', '#ff3636'],
  ['赛事', '#4d9cff']
])


// 英雄列表轮播
let heroBanner = reactive({
  data: []
})
/**
 * 英雄列表轮播
 */
const getHeroBanner = async () => {
  try {
    let res = await homeReq.getHeroBanner();
    if (res.status === 200) {
      // console.log('英雄列表轮播', res.data.items);
      heroBanner.data = res.data.items
    }
  } catch (error) {
    console.log(error);
    console.log('英雄列表轮播');
  }
};


let heroList = reactive({
  data: []
})
/**
 * 英雄列表
 */
const getHeroList = async () => {
  try {
    let res = await homeReq.getHeroList()
    if (res.status === 200) {
      // console.log('英雄列表', res.data);
      heroList.data = res.data
    }
  } catch (error) {
    console.log(error);
    console.log('英雄列表');
  }
}


let highVdo = reactive({
  data: []
})
/**
 * 精彩视频
 */ 
const highlightVdo = async () => {
  try {
    let res = await homeReq.getHighLigthVdo()
    if (res.status === 200) {
      // console.log('首页精彩视频', res.data);
      highVdo.data = res.data
    }
  } catch (error) {
    console.log(error);
    console.log('首页精彩视频错误');
  }
}


/**
 * 时间格式
 * @param str 
 */
const formatDate = (str:string):string => {
  let res = Array.from(str.matchAll(/^\d+\-(\d+)\-(\d+)\s.*?$/ig))[0]
  return `${res[1]}/${res[2]}`
}

onMounted(() => {
  getFirstSwiper();
  getShortNews();
  getHeroBanner();
  getHeroList();
  highlightVdo()
})

// let activeIndex = ref<number>(0)
// const changeActive = (index: number, swiper: any) => {
//   activeIndex.value = index
//   swiper.slideTo(index)
// }

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
    background-color: #f5f5f5;
    overflow: hidden;

    .hero-banner-box {
      padding: 0 .4rem;
    }

    .cont-item {
      background-color: #fff;
      &:last-child {
        border-bottom: none;
        margin-bottom: 0;
        padding-bottom: 0;
      }

      .cont-title {
        display: flex;
        align-items: center;
        padding: 0.4rem 0;
        margin: 0 0.4rem;
        border-bottom: 1px solid #eaedef;
        font-weight: normal;
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
          background-position: 0 -6.64rem;
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

    .news {
      min-height: 6.1333rem;
      .swiperItem-box {
        .news-item {
          font-size: .4267rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: .1333rem .4rem;
          
          .flag {
            font-size: .3733rem;
            border-radius: .08rem;
            border: 1px solid #d6a419;
            color: #d6a419;
            padding: 2px 3px;
            font-size: .32rem;
          }
          .text {
            margin: 0 .2667rem;
            flex: 1;
            color: #222;
            font-size: .3733rem;
          }
          .date {
            color: #777;
            font-size: .32rem;
          }
        }
      }
    }

    .heros {
      min-height: 8rem;
      .hero-list-box {
        .hero-list {
          padding: 0 .4rem;
          display: flex;
          flex-wrap: wrap;
          .hero-item {
            width: 20%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: .2133rem;
            img {
              width: 80%;
            }
            p {
              margin-top: .2133rem;
              font-size: .32rem;
            }
          }
        }
      }
    }

    .vdo-hot {
      min-height: 7.4667rem;
    }

    .highvdo-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: .4rem;
      .vdo-item-box {
        width: 49%;
        margin-bottom: .1333rem;
        &:nth-last-child(1), &:nth-last-child(2) {
          margin-bottom: 0;
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
