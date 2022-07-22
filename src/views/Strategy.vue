<template>
  <KeepScrollVue>
    <div class="strategy-page">
      <BannerVue :swiper-data="bannerData.data"></BannerVue>
      <div class="cont-item hot-vdo">
        <NavBannerVue :custom-title="true" :nav-swiper-data="hotVdoData.data" :auto-height="false" @slidechange="hotVdoChange">
          <template #title="slotProps">
            <div class="cont-title">
              <span class="text">热门视频</span>
              <div class="title-box">
                <span 
                  class="title-item"
                  v-for="(i, j) in slotProps.swiperTitle"
                  :key="j"
                  :class="{active: j === hotVdoIndex.value}"
                  @click="changeIndex(hotVdoIndex, j, slotProps.swiperEl)"
                >{{i}}</span>
              </div>
            </div>
          </template>
          <template #slideItem="slotProps">
            <div class="hot-vdo-item">
              <div 
                class="hot-item"
                v-for="(i, j) in slotProps.swiperItem.dataList"
                :key="j"
                @click="goPage({name: 'videoDetail', params: {'videoId': i.vdoId}})"
              >
                <template v-if="j === 0">
                  <div class="img-box">
                    <img :src="i.img" alt="">
                  </div>
                  <div class="content-box">
                    <p class="name two-eli">{{j+1}}. {{i.name}}</p>
                    <p class="info">
                      <span class="count">{{i.playCount}}</span>
                      <span class="time">{{i.iTime}}</span>
                    </p>
                  </div>
                </template>
                <template v-else>
                  <span class="name eli">{{j+1}}. {{i.name}}</span>
                  <span class="count">{{i.playCount}}</span>
                </template>
              </div>
            </div>
          </template>
        </NavBannerVue>
        <div class="bottom-txt" @click="toggleShowHot">{{!hotVdoAll ? '收起榜单' : '查看完整榜单'}}</div>
      </div>
      <div class="cont-item hero-strategy">
        <div class="cont-title">英雄攻略</div>
        <div class="hero-strategy-innerbox" v-if="strategyTitleList.data.length">
          <div class="strategy-title">
            <div class="top">
              <div
                class="title-item"
                v-for="(item, index) in strategyTitleList.data" 
                :key="index"
                :class="{active: titleActive === index}"
                @click="changeTitleActive(index)"
              >
                <img :src="item?.avatar" alt="">
                <p class="tag">{{item.type}}</p>
              </div>
              <div class="title-item">
                <p class="collapse" @click="toggleCollapse">{{isCollapse ? '展开' : '收起'}}</p>
              </div>
            </div>
            <div class="open-box">
              <transition name="fade">
                <!-- <div class="open-innerbox" :class="[!isCollapse ? 'zk' : 'sq']"> -->
                <div class="open-innerbox" v-show="!isCollapse">
                  <HeroSelectVue 
                    :heroData="heroList.data"
                    @heroChange="heroChange"
                  ></HeroSelectVue>
                </div>
              </transition>
            </div>
          </div>
          <div class="hero-info" @click="goPage({ name: 'heroDetail', params: {heroName} })">
            <span>{{heroName}}</span>
            <span>查看英雄详细介绍></span>
          </div>
          <div class="hero-data">
            <div class="hero-data-vdo" v-if="heroInfoData.data?.vdo">
              <div class="hero-data-vdo-item"
                v-for="(item, index) in heroInfoData.data.vdo"
                :key="index"
              >
                <VideoInfoVue :video-info="item"></VideoInfoVue>
              </div>
            </div>
            <div class="hero-data-article" v-if="heroInfoData.data?.article">
              <div class="hero-data-article-item"
                v-for="(item, index) in heroInfoData.data.article"
                :key="index"
                @click="goPage({name: 'articleDetail', params: {'articleId': item.newsId}})"
              >
                <div class="left">
                <!-- {{item}} -->
                  <img :src="item.img" alt="">
                </div>
                <div class="right">
                  <p class="title two-eli">{{item.name}}</p>
                  <p class="time">{{item.createdTime}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-hero-strategy" v-if="noHeroData">暂无<span>{{heroName}}</span>的攻略教程!</div>
        <div class="bottom-txt" @click="loadMore">加载更多...</div>
      </div>
      <div class="cont-item boutique-column">
        <div class="cont-title">精品栏目</div>
        <NavBannerVue :nav-swiper-data="allStrategy.data[2]">
          <template #slideItem="slotProps">
            <div class="vdo-box">
              <div class="column-item" v-for="(item, index) in slotProps.swiperItem.dataList" :key="index">
                <VideoInfoVue :video-info="item"></VideoInfoVue>
              </div>
            </div>
          </template>
        </NavBannerVue>
        <div class="bottom-txt" @click="loadMore">加载更多...</div>
      </div>
      <div class="cont-item boutique-column">
        <div class="cont-title">赛事精品</div>
        <NavBannerVue :nav-swiper-data="allStrategy.data[3]">
          <template #slideItem="slotProps">
            <div class="vdo-box">
              <div class="column-item" v-for="(item, index) in slotProps.swiperItem.dataList" :key="index">
                <VideoInfoVue :video-info="item"></VideoInfoVue>
              </div>
            </div>
          </template>
        </NavBannerVue>
        <div class="bottom-txt" @click="loadMore">加载更多...</div>
      </div>
      <div class="cont-item highlight-column">
        <div class="cont-title">精彩视频</div>
        <NavBannerVue :nav-swiper-data="allStrategy.data[4]" :auto-height="false">
          <template #slideItem="slotProps">
            <div class="vdo-box">
              <div class="column-item" v-for="(item, index) in slotProps.swiperItem.dataList" :key="index">
                <VideoInfoVue :video-info="item"></VideoInfoVue>
              </div>
            </div>
          </template>
        </NavBannerVue>
        <div class="bottom-txt" @click="loadMore">加载更多...</div>
      </div>
    </div>
  </KeepScrollVue>
</template>
<script lang="ts" setup>
import KeepScrollVue from '../components/KeepScroll.vue';
import { getCurrentInstance, onMounted, reactive, ref, watch } from 'vue';
import BannerVue from '../components/Banner.vue';
import NavBannerVue from '../components/NavBanner.vue';
import VideoInfoVue from '../components/VideoInfo.vue';
import HeroSelectVue from '../components/HeroSelect.vue';
import { strategyStore } from "../store/strategy";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const $router = useRouter();
const goPage = (params: any) => {
  $router.push(params)
}

const app: any = getCurrentInstance();
const strategyReq = app.proxy.$StrategyReq;

let bannerData = reactive({
  data: []
})
/**
 * 轮播
 */
const getBanner = async () => {
  try {
    let res = await strategyReq.getBanner()
    if (res.status === 200) {
      // console.log('轮播', res.data);
      bannerData.data = res.data.items
    }
  } catch (error) {
    console.log(error);
    console.log('攻略中心轮播错误');
  }
}

let allStrategy = reactive({
  data: []
})
/**
 * 获取所有攻略
 */
const getAllStrategy = async () => {
  let res = await strategyReq.getAllStrategy()
  if (res.status === 200) {
    // console.log('所有攻略', res.data);
    allStrategy.data = res.data
  }
}

// 热门视频轮播活动项
interface activeNum {
  value: number
}
let hotVdoIndex: activeNum = reactive({ value: 0 })

/**
 * 轮播切换
 */
const changeIndex = (activeIndex: activeNum, index: number, swiperEl: any) => {
  activeIndex.value = index
  swiperEl.slideTo(index)
}

// 是否完整榜单
let hotVdoAll = ref<boolean>(false)
interface hotVdoType {
  name: string;
  dataList: []
}
let hotVdoData = reactive({
  data: [] as Array<hotVdoType> 
})
// 热门视频显示条数
const toggleShowHot = () => {
  let d = (allStrategy.data[0] as []).map((i: any) => {
    return {
      name: i.name,
      dataList: hotVdoAll.value ? i.dataList.slice(0, 10) : i.dataList.slice(0, 3)
    }
  })
  hotVdoData.data = d
  hotVdoAll.value = !hotVdoAll.value
}
const hotVdoChange = (index: number) => {
  hotVdoIndex.value = index
}

// 加载更多
const loadMore = () => {
  app.proxy.$toast({ msg: '暂无更多内容...'})
}

let heroList = reactive({
  data: []
})
let strategyTitleList = reactive({
  data: []
})
/**
 * 获取英雄攻略
 */
const getHeroStrategy = async () => {
  let res = await app.proxy.$HomeReq.getHeroList()
  // console.log('英雄攻略', res.data);
  heroList.data = res.data
  strategyTitleList.data = res.data[0].dataList.slice(0, 6).map((i: any) => {
    return Object.assign({}, i, {type: '热门'})
  })
  strategyS.changeHeroName(strategyTitleList.data[0].name)
}
let titleActive = ref<number>(0)
const changeTitleActive = async (index: number) => {
  titleActive.value = index
  heroName.value = strategyTitleList.data[index].name
}
// 是否折叠状态
let isCollapse = ref<boolean>(true)
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

let strategyS = strategyStore()
// let name = computed(() => strategyS.heroName)
let {heroName} = storeToRefs(strategyS)
/**
 * 设置6个英雄的最后一个英雄
 */
const setLastHero = (name: string) => {
  let res = {}
  first:
  for (const item of heroList.data) {
    sec:
    for (const item1 of item.dataList) {
      if (item1.name === heroName.value) {
        res = item1
        res = Object.assign({}, res, {type: item.name})
        if (!strategyTitleList.data.some(i => i.name === res.name)) {
          strategyTitleList.data[strategyTitleList.data.length - 1] = res
        }
        break first
      }
    }
  }
}
let noHeroData = ref<boolean>(false)
let heroInfoData = reactive({
  data: {}
})
/**
 * 获取选中英雄的对应攻略数据
 */
const getHeroInfoData = async (name: string) => {
  heroInfoData.data = {}
  let res = await strategyReq.getHeroStrategy({ name })
  // console.log(`${name}英雄攻略`, res.data);
  heroInfoData.data = res.data
  noHeroData.value = heroInfoData.data.vdo.length === 0 
}
watch(
  heroName, 
  async (newV) => {
    // console.log('新选中', newV);
    setLastHero(newV)
    await getHeroInfoData(newV)
  }
)
// watch(
//   () => strategyTitleList.data,
//   (newV) => {
//     changeTitleActive()
//   },
//   {deep: true}
// )
const heroChange = (name: string) => {
  let index = strategyTitleList.data.findIndex(i => i.name === name)
  if (index !== -1) {
    changeTitleActive(index)
  } else {
    changeTitleActive(strategyTitleList.data.length - 1)
  }
  isCollapse.value = true
  heroName.value = name
  // console.log('hero', name);
}


onMounted(async () => {
  await getBanner()
  await getAllStrategy()
  toggleShowHot()
  await getHeroStrategy()
})


</script>
<style lang="scss" scoped>
.strategy-page {
  font-size: .4267rem;
  background-color: #f5f5f5;

  .cont-item {
    padding-bottom: 0;
    min-height: 9rem;
    display: flex;
    flex-direction: column;

    &.hot-vdo {
      min-height: 6.1333rem;
    }
    .bottom-txt {
      font-size: .32rem;
      color: #757577;
      text-align: center;
      padding: .2133rem 0;
      margin: 0 .4rem;
      border-top: 1px solid #eaedef;
      // margin-top: .16rem;
      margin-top: auto;
      // &:active {
      //   background-color: #e4e4e4;
      // }
    }
  }
  
  .hot-vdo {
    .cont-title {
      .text {
        font-weight: bold;
      }
      .title-box {
        margin-left: auto;
        font-size: .3733rem;
        font-weight: normal;
        .title-item {
          color: #757577;
          margin-left: .4rem;
          &.active {
            color: #db9e3f;
            border-bottom: .08rem solid;
            padding: .0533rem 0;
          }
        }
      }
    }
    .hot-vdo-item {
      padding: 0 .4rem;
      .hot-item {
        display: flex;
        padding: .24rem 0;
        border-bottom: 1px solid #eaedef;
        &:last-child {
          border-bottom: none;
        }
        .img-box {
          width: 35%;
          img {
            width: 100%;  
          }
        }
        .content-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: .2667rem;
          font-size: .32rem;
          line-height: 1.5;
          .info {
            margin-top: .16rem;
            color: rgb(108, 108, 108);
            .time {
              margin-left: .24rem;
            }
          }
        }
        .content {
          display: flex;
          font-size: .32rem;
          line-height: 1.5;
          
        }
        font-size: .32rem;
        .name {
            width: 85%;
          }
          .count {
            margin-left: auto;
            color: rgb(108, 108, 108);
          }
      }
    }
  }
  
  .hero-strategy {
    min-height: 14rem;
    .hero-strategy-innerbox {
      .strategy-title {
        padding: 0 .4rem;
        .top {
          display: flex;
          margin-top: .24rem;
          font-size: 0;
          position: relative;
          .title-item {
            $borderWidth: .16rem;
            border-radius: $borderWidth;
            flex: 1;
            aspect-ratio: 1;
            margin-right: .24rem;
            position: relative;
            &.active {
              &::after {
                content: "";
                display: block;
                z-index: 10;
                position: absolute;
                top: -0.0267rem;
                left: -0.0267rem;
                right: -0.0267rem;
                bottom: -0.0267rem;
                border: .0533rem solid #db9e3f;;
                border-radius: $borderWidth;
              }
            }
            &:last-child {
              margin-right: 0;
            }
            img {
              width: 100%;
              border-radius: $borderWidth;
            }
            .tag {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              font-size: .2667rem;
              text-align: center;
              background-color: rgba(0, 0, 0, 0.6);
              color: #fff;
              border-radius: 0 0 $borderWidth $borderWidth;
              padding: .0533rem 0;
            }
            .collapse {
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              color: black;
              font-size: .32rem;
              border: .0533rem solid #ddd;
              background-color: #f5f5f5;
              border-radius: $borderWidth;
            }
          }
        }
        .open-box {
          margin-top: .24rem;
          position: relative;
          .open-innerbox {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            z-index: 999;
            background-color: #fff;
          }
        }
      }
      .hero-info {
        background-color: #f4f4f4;
        color: #3a3939;
        font-size: .32rem;
        padding: .16rem 0.4rem;;
        display: flex;
        justify-content: space-between;
      }
      .hero-data {
        padding: .24rem .4rem;
        padding-bottom: 0;
        .hero-data-vdo {
          display: flex;
          justify-content: space-between;
          .hero-data-vdo-item {
            width: 48%;
          }
        }
        .hero-data-article {
          margin-top: .24rem;
          .hero-data-article-item {
            display: flex;
            padding: .32rem 0;
            border-top: .0267rem solid #eaedef;
            .left {
              width: 36%;
              img {
                width: 100%;
              }
            }
            .right {
              display: flex;
              flex-direction: column;
              flex: 1;
              justify-content: space-between;
              margin-left: .24rem;
              overflow: hidden;
              .title {
                color: #343440;
                font-size: .4rem;
                line-height: 1.3;
              }
              .time {
                color: #7a7a80;
                font-size: .32rem;
              }
            }
          }
        }
      }
    }
    .no-hero-strategy {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 8rem;
      color: #676464;
      font-size: .48rem;
      span {
        color: red;
        font-size: .64rem;
        padding: 0 .16rem;
      }
    }
  }

  .boutique-column {
    :deep(.nav-banner-box) {
      .title-box {
        justify-content: flex-start;
        overflow-x: auto;
        span {
          white-space: nowrap;
          margin-right: .4rem;
        }
      }
    }
  }
  .vdo-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 .4rem;
    .column-item {
      width: 49%;
      margin-bottom: .24rem;
    }
  }
}
</style>