<template>
  <div class="race-page">
    <div class="nav-title" ref="navTitlebox">
      <div 
        class="title-item"
        ref="titleItem"
        v-for="(item, index) in title"
        :key="index"
        :class="{'active': activeIndex === index}"
        @click="changeTitle(index)"
      >{{item}}</div>
    </div>
    <div class="race-content-box" ref="raceBox">
      <swiper
        class="race-swiper" 
        :resistanceRatio="0"
        @swiper="getSwiper"
        @slideChange="slideChange"
      >
        <swiper-slide
          class="slide-item"
          ref="slideItemBox"
          v-for="(item, index) in raceArticle"
          :key="index"
          @scroll.passive="handleScroll"
        >
          <div
            class="item-box"
            ref="slideItemInnerBox"
          >
            <div class="race-title"> 王者荣耀 {{ title[index] }} <span>官方举办</span> </div>
            <img class="tagImg" v-if="imgList[index].length" :src="imgList[index]" alt="" />
            <div class="race-text" v-if="item?.dataList?.length"> 赛事资讯 </div>
            <div
              class="race-title-item"
              v-for="(item1, index1) in item.dataList"
              :key="index1"
              @click=" router.push({ name: 'articleDetail', params: { articleId: item1._id }, }) "
            >
            <div class="article-name eli">{{ item1.name }}</div>
            <div class="article-time">{{formatDate(item1.createdTime)}}</div>
            </div>
          </div>
          <div class="bottom-loading" v-if="item.dataList.length">
            <p v-show="item.dataList.length < item.total">正在加载中...</p>
            <p v-show="item.dataList.length >= item.total">已显示全部内容</p>
          </div>
          <div class="no-data" v-if="!loading && !item.dataList.length">暂无该分类数据!</div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import raceApi from '@/api/race';

const router = useRouter()
const title = ref([ "KPL", "挑战者杯", "全国大赛", "K甲联赛", "高校联赛", "TGA", "WGI", "模拟战大师赛" ])
// 存放数据
const raceArticle = ref<any[]>(title.value.map((i: any) => ({
  total: 0,
  dataList: [],
})))
// 存放请求参数
const reqParam = ref<any[]>(title.value.map((i: any) =>({ name: i, pageNum: 1, pageSize: 5 })))
// 中部的图
const imgList = ref<string[]>([
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/kpl.jpg',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/kcc.jpg',
  '',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/kgl.jpg',
  '',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/tga.jpg',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/wgi.jpg',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/mnz.jpg'
])
// 激活的导航下标
const activeIndex = ref<number>(0)
// swiper 实例
let swiperEl = ref<any>(null)
// 获取 swiper 实例
const getSwiper = (swiperInstance: any) => {
  swiperEl.value = swiperInstance
}
// 导航标签容器
const navTitlebox = ref<any>(null)
// 导航标签数组
const titleItem = ref<any[]>([])
// 每个标签块对应的轮播块容器, 需要固定高度, 这样可以保存切换前的滚动高度
const slideItemBox = ref<any>(null)
const slideItemInnerBox= ref<any>(null)
// 内容加载
const loading = ref<boolean>(true)
// 底部加载提示
const bottomLoading = ref<boolean>(false)
// 导航标签切换时
const changeTitle = async (index: number) => {
  activeIndex.value = index
  swiperEl.value.slideTo(index)
}
// swiper 切换时
const slideChange = async () => {
  const index = swiperEl.value.activeIndex
  activeIndex.value = index
  
  // 让导航标识居中
  let activeItemEl = titleItem.value[index]
  let navTitleWidth = navTitlebox.value.offsetWidth
  // 超过一半居中
  if (activeItemEl.offsetLeft > navTitleWidth / 2) {
    navTitlebox.value.scrollTo({
      left: activeItemEl.offsetLeft - navTitleWidth / 2 + activeItemEl.offsetWidth / 2, 
      top: 0,
      behavior: 'smooth'
    })
  }
  // 小于一半滚动到 (0, 0)
  if (activeItemEl.offsetLeft <= navTitleWidth / 2) {
    navTitlebox.value.scrollTo({
      left: 0, 
      top: 0,
      behavior: 'smooth'
    })
  }

  await getItemData()
}
// 获取数据, 如果没满屏幕高度, 就重复获取, 到占满一个屏幕高度
const getItemData = async () => {
  loading.value = true
  await nextTick()
  // 这种情况要获取数据
  if (
    // 没有总数还未获取过数据
    !raceArticle.value[activeIndex.value].total 
    // 父容器高度 > 子容器高度
    || (slideItemBox.value[activeIndex.value].$el.offsetHeight > slideItemInnerBox.value[activeIndex.value].offsetHeight
      // 获取到的数量 < 可以获取的总数
      && raceArticle.value[activeIndex.value].dataList.length < raceArticle.value[activeIndex.value].total)
  ) {
    reqParam.value[activeIndex.value].pageNum += 1
    let res = await raceApi.getRaceArticle(reqParam.value[activeIndex.value])
    loading.value = false
    if (res.data.dataList?.length) {
      raceArticle.value[activeIndex.value].dataList.push(...res.data.dataList)
      raceArticle.value[activeIndex.value].total = res.data.total
    }
    // 有些导航标签可能没有内容, 不用再重新获取
    if (raceArticle.value[activeIndex.value].total) {
      await getItemData()
    }
  }
}
// 处理滚动
let scrollTimer: any = null
const handleScroll = async () => {
  scrollTimer && clearTimeout(scrollTimer)
  scrollTimer = setTimeout(async () => {
    if (
      // 避免请求完成前重复触发
      !bottomLoading.value 
      // 滚动到距离底部小于50px时
      && slideItemBox.value[activeIndex.value].$el.offsetHeight + slideItemBox.value[activeIndex.value].$el.scrollTop >= slideItemBox.value[activeIndex.value].$el.scrollHeight - 50
      // 现有数量小于总数
      && raceArticle.value[activeIndex.value].dataList.length < raceArticle.value[activeIndex.value].total
    ) {
      bottomLoading.value = true
      let res = await raceApi.getRaceArticle(reqParam.value[activeIndex.value])
      if (res.data.dataList?.length) {
        raceArticle.value[activeIndex.value].dataList.push(...res.data.dataList)
        raceArticle.value[activeIndex.value].total = res.data.total
      }
      reqParam.value[activeIndex.value].pageNum += 1
      bottomLoading.value = false
    }
  }, 300)
}
// 时间格式
const formatDate = (str: string): string => {
  const f = (val: number): string => {
    return val < 10 ? `0${val}` : `${val}`;
  };
  const d = new Date(str);
  return `${d.getFullYear()}-${f(d.getMonth() + 1)}-${f(d.getDate())}`;
};

onMounted(async () => {
  await getItemData()
})

// 离开当前路由保存滚动高度
let navLeft: number = 0
let scrollT: number[] = Array.from({ length: title.value.length }, () => 0);
onBeforeRouteLeave(() => {
  navLeft = Math.floor(navTitlebox.value.scrollLeft)
  scrollT = slideItemBox.value.map((item: any) => item.$el.scrollTop)
})
// 重新设置滚动高度
onActivated(async () => {
  await nextTick()
  navTitlebox.value.scrollLeft = navLeft
  scrollT.forEach((item, index) => {
    slideItemBox.value[index].$el.scrollTop = item
  })
})

</script>
<style lang="scss" scoped>
.race-page {
  font-size: .3733rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav-title {
    flex-shrink: 0;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    padding: .16rem .4rem;
    display: flex;
    align-items: center;
    height: .96rem;
    line-height: .96rem;
    overflow: auto;
    box-sizing: content-box;
    .title-item {
      white-space: nowrap;
      margin-right: .48rem;
      position: relative;
      &.active {
        color: #d59b40;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          background-color: #d59b40;
          width: 100%;
          height: 3px;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .race-content-box {
    flex: 1;
    overflow: hidden;
    :deep(.swiper-slide) {
      overflow: auto;
    }
  }
  .race-swiper {
    height: 100%;
    .race-title {
      color: #00ADFF;
      font-weight: bold;
      font-size: .48rem;
      line-height: 1.5;
      padding: .16rem .4rem;
      display: flex;
      align-items: center;
      span {
        vertical-align: middle;
        margin-left: .24rem;
        font-weight: normal;
        border-radius: 100px;
        padding: 0 .16rem;
        font-size: .32rem;
        // border: 1px solid #A2A2A2;
        color: #A2A2A2;
      }
    }
    .tagImg {
      margin: .32rem 0;
      width: 100%;
    }
    .race-text {
      text-align: center;
      padding: .24rem 0;
      color: #a2a2a2;
      background: #e4e4e4;
    }
    .race-title-item {
      padding: .24rem .4rem;
      display: flex;
      align-items: center;
      font-size: .4rem;
      line-height: 1.3;
      .article-name {
        margin-right: .32rem;
        flex: 1;
        color: #333;
      }
      .article-time {
        font-size: .32rem;
        white-space: nowrap;
        color: #9e9e9e;
        // margin-left: auto;
      }
    }
    .loading-tip, .no-data {
      font-size: .48rem;
      text-align: center;
      color: #5e5e5e;
      height: 5.3333rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .inner-box {
      padding-bottom: .4rem;
    }
    .bottom-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        width: 90%;
        text-align: center;
        background-color: #e4e4e4;
        color: #767676;
        padding: .24rem .32rem;
        border-radius: .48rem;
        margin: .32rem 0;
      }
    }
  }
}
</style>