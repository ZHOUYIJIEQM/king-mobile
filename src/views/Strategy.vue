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
        <div class="bottom-txt" @click="toggleShowHot">{{!hotVdoAll ? '查看完整榜单' : '收起榜单'}}</div>
      </div>
      <div class="cont-item hero-strategy">
        <div class="cont-title">英雄攻略</div>
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
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import BannerVue from '../components/Banner.vue';
import NavBannerVue from '../components/NavBanner.vue';
import VideoInfoVue from '../components/VideoInfo.vue';

const app: any = getCurrentInstance();
const strategyReq = app.appContext.config.globalProperties.$StrategyReq;

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
    console.log('所有攻略', res.data);
    allStrategy.data = res.data
  }
}

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
let hotVdoAll = ref<boolean>(true)
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
      dataList: hotVdoAll.value ? i.dataList.slice(0, 3) : i.dataList.slice(0, 10)
    }
  })
  hotVdoData.data = d
  hotVdoAll.value = !hotVdoAll.value
}
const hotVdoChange = (index: number) => {
  hotVdoIndex.value = index
}

const loadMore = () => {
  
}

onMounted(async () => {
  await getBanner()
  await getAllStrategy()
  toggleShowHot()
})


</script>
<style lang="scss" scoped>
.strategy-page {
  font-size: .4267rem;
  background-color: #f5f5f5;

  .cont-item {
    padding-bottom: 0;

    &.hot-vdo {
      .bottom-txt {
        margin-top: 0;
        border-top: 0px;
      }
    }
    .bottom-txt {
      font-size: .32rem;
      color: #757577;
      text-align: center;
      padding: .2133rem 0;
      margin: 0 .4rem;
      border-top: 1px solid #eaedef;
      margin-top: .16rem;
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
    min-height: 8rem;
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
    }
  }
}
</style>