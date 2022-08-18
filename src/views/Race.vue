<template>
  <div class="race-page">
    <div class="nav-title" ref="navTitle">
      <div 
        class="title-item"
        ref="titleItem"
        v-for="(item, index) in title"
        :key="index"
        :class="{'active': activeIndex === index}"
        @click="changeTitle(index)"
      >
        {{item}}
      </div>
    </div>
    <div class="race-content-box" ref="raceBox">
      <swiper
        v-if="raceArticle.data.length"
        class="race-swiper" 
        :resistanceRatio="0"
        @swiper="getSwiper"
        @slide-change="slideChange"
      >
        <swiper-slide
          class="slide-item"
          v-for="(item, index) in raceArticle.data"
          :key="index"
        >
          <div class="item-box" ref="itemBox" @scroll="handleScroll(index)">
            <div class="inner-box" ref="itemInnerBox">
              <div class="race-title">王者荣耀 {{title[index]}} <span>官方举办</span></div>
              <img class="tagImg" v-if="imgList[index].length" :src="imgList[index]" alt="">
              <div class="race-text" v-if="item?.dataList?.length">赛事资讯</div>
              <div
                class="race-title-item"
                v-for="(item1, index1) in item.dataList"
                :key="index1"
                @click="$router.push({name: 'articleDetail', params: {'articleId': item1._id}})"
              >
                <div class="article-name eli">{{item1.title}}</div>
                <div class="article-time">{{item1.createdTime.split(' ').at(0).split('-').slice(1).join('/')}}</div>
              </div>
              <div class="bottom-loading" v-show="bottomLoading">
                <p>正在加载中...</p>
              </div>
              <div class="bottom-loading" v-show="finish.data[index]">
                <p>已显示全部内容</p>
              </div>
              <div class="loading-tip" v-show="loading">正在加载中...</div>
              <div class="no-data" v-if="item.dataList && !item.dataList.length">暂无该分类数据!</div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { getCurrentInstance, nextTick, onActivated, onMounted, reactive, ref } from 'vue';
import { onBeforeRouteLeave, useRouter } from "vue-router";
const app: any = getCurrentInstance()
const $router = useRouter()

let title = ref([ "KPL", "挑战者杯", "全国大赛", "K甲联赛", "高校联赛", "TGA", "WGI", "模拟战大师赛" ])
// 存放数据
let raceArticle = reactive({ data: [] as any })
// 存放请求参数
let reqParam = reactive({ data: [] as any })
let imgList = ref([
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/kpl.jpg',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/kcc.jpg',
  '',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/kgl.jpg',
  '',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/tga.jpg',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/wgi.jpg',
  'https://game.gtimg.cn/images/yxzj/m/m201706/images/matchindex/mnz.jpg'
])
let scrollTop = Array.from({length: title.value.length}, () => 0)

let loading = ref<boolean>(true)
let bottomLoading = ref<boolean>(false)
let finish = reactive({ data: [] as any})

/**
 * swiper 实例
 */
const swiperEl = ref()
const getSwiper = (swiperInstance: any) => {
  swiperEl.value = swiperInstance
}

const activeIndex = ref<number>(0)
const slideChange = async () => {
  const index = swiperEl.value.activeIndex
  activeIndex.value = index

  // 让导航标识居中
  let activeItemEl = titleItem.value[index]
  let rectInfo = activeItemEl.getBoundingClientRect()
  let navTitleWidth = navTitle.value.offsetWidth
  if (rectInfo.left <= 0) {
    navTitle.value.scrollTo({
      left: navTitle.value.scrollLeft - navTitleWidth / 2 - activeItemEl.offsetLeft, 
      top: 0,
      behavior: 'smooth'
    })
  }
  if (activeItemEl.offsetLeft > navTitleWidth / 2) {
    // console.log('超过一半', navTitleWidth / 2 - activeItemEl.offsetLeft);
    navTitle.value.scrollTo({
      left: activeItemEl.offsetLeft - navTitleWidth / 2 + rectInfo.width / 2, 
      top: 0,
      behavior: 'smooth'
    })
  }
  if (activeItemEl.offsetLeft <= navTitleWidth / 2) {
    navTitle.value.scrollTo({
      left: 0, 
      top: 0,
      behavior: 'smooth'
    })
  }

  // 没有数据就加载
  if (!raceArticle.data[activeIndex.value]?.dataList?.length) {
    loading.value = true
    let data = await getRace(reqParam.data[activeIndex.value])
    raceArticle.data[activeIndex.value] = data
    // raceArticle.data.splice(activeIndex.value, 1, data)
    // console.log('没有数据, 加入', raceArticle.data[activeIndex.value]);
    loading.value = false

    // 还没铺满就继续加载
    await reGetData()
  }
  
}

/**
 * 获取分类文章
 */
const getRace = async (params: any) => {
  let res = await app.proxy.$Race.getRaceArticle(params)
  return res.data
}

const titleItem = ref<any>(null)
const navTitle = ref<any>(null)
const itemBox= ref<any>(null)
const itemInnerBox= ref<any>(null)

const reGetData = async () => {
  await nextTick()
  if (itemBox.value[activeIndex.value].offsetHeight - itemInnerBox.value[activeIndex.value].offsetHeight >= 0 && raceArticle.data[activeIndex.value].dataList.length < raceArticle.data[activeIndex.value].total) {
    // console.log('还没铺满');
    reqParam.data[activeIndex.value].pageNum += 1
    let data = await getRace(reqParam.data[activeIndex.value])
    if (data?.dataList?.length) {
      raceArticle.data[activeIndex.value].dataList.push(...data.dataList)
      finish.data[activeIndex.value] = raceArticle.data[activeIndex.value].dataList.length >= raceArticle.data[activeIndex.value].total 
    }
    await reGetData()
  }
}

/**
 * 标签切换
 */
const changeTitle = async (index: number) => {
  activeIndex.value = index
  swiperEl.value.slideTo(index)
}

/**
 * 处理滚动
 */
const handleScroll = async (index: number) => {
  if (!finish.data[index] && itemBox.value[index].offsetHeight + itemBox.value[index].scrollTop >= itemBox.value[index].scrollHeight - 30 && !bottomLoading.value) {
    bottomLoading.value = true
    // console.log('加载...');
    reqParam.data[activeIndex.value].pageNum += 1
    let data = await getRace(reqParam.data[activeIndex.value])
    raceArticle.data[activeIndex.value].dataList.push(...data.dataList)
    bottomLoading.value = false
    finish.data[index] = raceArticle.data[activeIndex.value].dataList.length >= raceArticle.data[activeIndex.value].total 
  }
}

onMounted(async () => {
  raceArticle.data = title.value.map(i => { return {} })
  reqParam.data = title.value.map(i => {
    return {
      name: i,
      pageNum: 1,
      pageSize: 10
    }
  })
  finish.data = title.value.map(i => false)
  // console.log('数据', raceArticle.data);
  // console.log('请求参数', reqParam.data);
  // console.log('结束标记', finish.data);
  await nextTick()
  slideChange()
})

let navTitleScrollLeft = 0

onActivated(async () => {
  await nextTick()
  // 恢复滚动距离
  navTitle.value.scrollLeft = navTitleScrollLeft
  scrollTop.forEach((item, index) => {
    itemBox.value[index].scrollTop = item
  })
})

onBeforeRouteLeave(() => {
  // 记录滚动距离
  navTitleScrollLeft = Math.floor(navTitle.value.scrollLeft)
  scrollTop = itemBox.value.map((item: any) => Math.floor(item.scrollTop)) 
  // console.log(navTitleScrollLeft, scrollTop);
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
    .item-box {
      height: 100%;
      overflow: auto;
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
        padding: 9px 12px;
        border-radius: .48rem;
      }
    }
  }
}
</style>