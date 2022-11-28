<template>
  <div class="strategy-page">
    <Banner 
      :swiperData="bannerData"
      :loop="true"
      :modules="['Autoplay', 'Pagination']"
    >
      <template #default="props">
        <a target="_blank" class="img-box">
          <img :src="props.slideItem.img" alt="" />
        </a>
      </template>
    </Banner>
    <div class="cont-item hot-vdo">
      <NavBanner 
        :customTitle="true" 
        :navSwiperData="hotVdoData" 
        :autoHeight="false" 
        @slidechange="hotVdoChange"
      >
        <template #title="slotProps">
          <div class="cont-title">
            <span class="text">热门视频</span>
            <div class="title-box">
              <span 
                class="title-item"
                v-for="(i, j) in slotProps.swiperTitle"
                :key="j"
                :class="{active: j === hotVdoIndex}"
                @click="changeIndex(j, slotProps.swiperEl)"
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
              @click="router.push({name: 'videoDetail', params: {'videoId': i.vdoId}})"
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
      </NavBanner>
      <div class="bottom-txt" @click="toggleShowHot">{{!isAllHotVdo ? '收起榜单' : '查看完整榜单'}}</div>
    </div>
    <div class="cont-item hero-strategy">
      <div class="cont-title">英雄攻略</div>
      <div class="hero-strategy-innerbox" v-if="strategyHotHero.length">
        <div class="strategy-title">
          <div class="top">
            <div
              class="title-item"
              v-for="(item, index) in strategyHotHero" 
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
                <HeroSelect 
                  :heroData="heroList"
                  @heroChange="heroChange"
                ></HeroSelect>
              </div>
            </transition>
          </div>
        </div>
        <div class="hero-info" @click="router.push({ name: 'heroDetail', params: { heroName } })">
          <span>{{heroName}}</span>
          <span>查看英雄详细介绍></span>
        </div>
        <div class="hero-data">
          <div class="hero-data-vdo" v-if="heroInfoData?.vdo">
            <div class="hero-data-vdo-item"
              v-for="(item, index) in heroInfoData.vdo"
              :key="index"
            >
              <VideoInfo :video-info="item"></VideoInfo>
            </div>
          </div>
          <div class="hero-data-article" v-if="heroInfoData?.article">
            <div class="hero-data-article-item"
              v-for="(item, index) in heroInfoData.article"
              :key="index"
              @click="router.push({name: 'articleDetail', params: {'articleId': item._id}})"
            >
              <div class="left">
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
      <div class="no-hero-strategy" v-if="!heroInfoData?.vdo?.length">暂无<span>{{heroName}}</span>的攻略教程!</div>
      <div class="bottom-txt" @click="loadMore">加载更多...</div>
    </div>
    <div 
      class="cont-item boutique-column"
      v-for="(item, index) in allStrategy.slice(1)"
      :key="index"
    >
      <div class="cont-title">{{item.name}}</div>
      <NavBanner :navSwiperData="item.dataList">
        <template #slideItem="slotProps">
          <div class="vdo-box">
            <div class="column-item" 
              v-for="(item1, index1) in slotProps.swiperItem.dataList" 
              :key="index1"
            >
              <VideoInfo :videoInfo="item1" />
            </div>
          </div>
        </template>
      </NavBanner>
      <div class="bottom-txt" @click="loadMore">加载更多...</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { strategyStore } from "@/stores/index";
import strategyApi from "@/api/strategy";
import homeApi from "@/api/home";
import { saveScrollH } from "@/utils/saveScrollH";
import { storeToRefs } from "pinia";
saveScrollH();

interface hotVdoType {
  name: string;
  dataList: []
}
interface strategyHeroType {
  avatar: string;
  ename: string;
  name: string;
  type: string;
}

const app: any = getCurrentInstance()
const router = useRouter();
// 轮播数据
const bannerData = ref<any[]>([]);
// 存放所有攻略数据
const allStrategy = ref<any>([]);
// 热门视频数据
const hotVdoData = ref<hotVdoType[]>([])
// 热门视频下标
const hotVdoIndex = ref<number>(0)
// 是否完整榜单
const isAllHotVdo = ref<boolean>(false)
// 所有英雄
const heroList = ref<any[]>([])
// 英雄攻略热门英雄
const strategyHotHero = ref<strategyHeroType[]>([]);
// 选中的英雄
const { heroName } = storeToRefs(strategyStore())
// 英雄攻略激活的下标
const titleActive = ref<number>(0)
// 英雄攻略处列表是否折叠状态
const isCollapse = ref<boolean>(true)
// 英雄攻略 视频/文章
const heroInfoData = ref<any>({})

// 获取轮播数据
const getBanner = async () => {
  try {
    let res = await strategyApi.getBanner();
    if (res.status === 200) {
      // console.log('轮播', res.data);
      bannerData.value = res.data.items;
    }
  } catch (error) {
    console.log(error);
    console.log("攻略中心轮播错误");
  }
};
// 获取所有攻略
const getAllStrategy = async () => {
  let res = await strategyApi.getAllStrategy()
  if (res.status === 200) {
    // console.log('所有攻略', res.data);
    allStrategy.value = res.data
  }
}
// 热门视频显示条数
const toggleShowHot = async () => {
  hotVdoData.value = allStrategy.value[0].dataList.map((i: any) => {
    return {
      name: i.name,
      dataList: isAllHotVdo.value ? i.dataList.slice(0, 10) : i.dataList.slice(0, 3)
    }
  })
  isAllHotVdo.value = !isAllHotVdo.value
}
// 热门视频下标切换
const hotVdoChange = (index: number) => {
  hotVdoIndex.value = index
}
// 轮播切换
const changeIndex = (index: number, swiperEl: any) => {
  hotVdoIndex.value = index
  swiperEl.slideTo(index)
}
// 获取英雄攻略
const getHeroStrategy = async () => {
  let res = await homeApi.getHeroList()
  // console.log('英雄攻略', res.data);
  heroList.value = res.data
  strategyHotHero.value = res.data[0].dataList.slice(0, 6).map((i: any) => {
    return Object.assign({}, i, {type: '热门'})
  })
  strategyStore().changeHeroName(strategyHotHero.value[0].name)
}
// 英雄攻略切换英雄
const changeTitleActive = async (index: number) => {
  titleActive.value = index
  heroName.value = strategyHotHero.value[index].name
}
// 切换英雄
const heroChange = (name: string) => {
  let index = strategyHotHero.value.findIndex(i => i.name === name)
  if (index !== -1) {
    changeTitleActive(index)
  } else {
    changeTitleActive(strategyHotHero.value.length - 1)
  }
  isCollapse.value = true
  heroName.value = name
}
// 切换 英雄列表
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
// 获取选中英雄的对应攻略数据
const getHeroInfoData = async (name: string) => {
  heroInfoData.value = {}
  let res = await strategyApi.getHeroStrategy({ name })
  // console.log(`${name}英雄攻略`, res.data);
  heroInfoData.value = res.data
}
// 设置6个英雄的最后一个英雄
const setLastHero = (name: string) => {
  let res: any = {}
  first:
  for (const item of heroList.value) {
    for (const item1 of item.dataList) {
      if (item1.name === name) {
        res = item1
        res = Object.assign({}, res, {type: item.name})
        if (!strategyHotHero.value.some(i => i.name === res.name)) {
          strategyHotHero.value[strategyHotHero.value.length - 1] = res
        }
        break first
      }
    }
  }
}
// 加载更多
const loadMore = () => {
  app.proxy.$toast({ msg: '暂无更多内容...'})
}
watch(
  heroName, 
  async (newV) => {
    setLastHero(newV)
    await getHeroInfoData(newV)
  }
)

onMounted(async () => {
  await getBanner()
  await getAllStrategy()
  await toggleShowHot()
  await getHeroStrategy()
})
</script>
<style lang="scss" scoped>
.strategy-page {
  font-size: .4267rem;
  background-color: #f5f5f5;

  .img-box {
    display: block;
    img {
      width: 100%;
    }
  }

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
