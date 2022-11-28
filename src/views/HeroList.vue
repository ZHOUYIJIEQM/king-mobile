<template>
  <div class="more-hero" v-if="heroList.length">
    <NavBanner :navSwiperData="heroList" :auto-height="false">
      <template #slideItem="slotProps">
        <div class="hero-list">
          <div 
            class="hero-item"
            v-for="(i, j) in slotProps.swiperItem.dataList"
            :key="j"
            @click="router.replace({name: 'heroDetail', params: {heroName: i.name} })"
          >
            <img :src="i.avatar" alt="">
            <p>{{i.name}}</p>
          </div>
        </div>
      </template>
    </NavBanner>
  </div>
  <div class="loading-bg loading-skeleton" v-else></div>
</template>
<script lang="ts" setup>
import homeApi from '@/api/home';

// 更多英雄
const heroList = ref<any[]>([])
const app: any = getCurrentInstance()
const router = useRouter()

// 合并出全部
const mergeAll = (heroListData: []) => {
  let all: any = {name: '全部', dataList: []}
  let res: any = []
  heroListData.forEach((item: any) => {
    if(item.name !== '热门') {
      item.dataList.forEach((hero: any) => {
        let index = all.dataList.findIndex((heroItem: any) => heroItem.name === hero.name)
        if (index === -1) {
          all.dataList.push(hero)
        }
      });
      res.push(item)
    }
  })
  // 升序
  all.dataList = all.dataList.sort((i: any, j: any) => {
    return Number(i.ename) - Number(j.ename)
  })
  res.unshift(all)
  return res
}

onMounted(async () => {
  let heroListRes = await homeApi.getHeroList()
  heroList.value = mergeAll(heroListRes.data)
})
</script>
<style lang="scss" scoped>
.more-hero {
  height: 100%;
  padding-top: 1.3333rem; 
  :deep(.nav-banner-box) {
    .title-box {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 999;
    }
    height: 100%;
    .swiper {
      height: 100%;
      .swiper-wrapper {
        height: 100%;
        .slide-item{
          height: 100%;
          .hero-list {
            height: 100%;
            overflow: auto;
            align-content: flex-start;
          }
        }
      }
    }
  }
}
</style>