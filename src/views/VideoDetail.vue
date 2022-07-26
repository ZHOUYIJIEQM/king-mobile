<template>
  <div class="video-detail-page">
    <div class="navbar">
      <span @click="$router.push({name: 'home'})">王者荣耀</span>
      <!-- todo: 跳转到英雄列表 -->
      <span 
        style="font-size: 12px;"
        @click="$router.replace({name: 'HeroList'})"
      >更多英雄></span>
    </div>
    <div class="detail-nav eli" v-if="vdoInfo.name">
      <div class="back" @click="$router.go(-1)">&lt;</div>
      <div class="title eli">{{vdoInfo.name}}</div>
    </div>
    <div class="vdo-content">
      <div class="vdo-box" @click="app.proxy.$toast({msg: '无法播放, 视频地址不可用!', className: 'error'})">
        <img :src="vdoInfo.img" alt="">
        <span class="play-icon"></span>
        <span class="time" v-if="vdoInfo.iTime">{{vdoInfo.iTime}}</span>
      </div>
      <div class="vdo-info">
        <img :src="vdoInfo.img" alt="" class="pic">
        <div class="name">
          <p>{{vdoInfo.name}}</p>
          <p class="play-count">播放次数: {{vdoInfo.playCount}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'VideoDetailExclude'
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute()
const app: any = getCurrentInstance()

let vdoInfo = ref<any>({})
async function getVideoDetail(params: any) {
  let res = await app.proxy.$Resources.getResources(params)
  vdoInfo.value = res.data
  // console.log('视频详情', res.data);
}

onMounted(async () => {
  await getVideoDetail(Object.assign({id: $route.params.videoId}, { type: 'video' }))
})
</script>
<style lang="scss" scoped>
.video-detail-page {
  padding-top: calc(1.2rem + 1.0933rem);
  .vdo-content {
    .vdo-box {
      position: relative;
      font-size: 0;
      min-height: 5.3333rem;
      img {
        width: 100%;
      }
      .play-icon {
        width: 2.1333rem;
        background-size: 4.5867rem;
        background-position: -1.0133rem -2.0267rem;
      }
      .time {
        padding: .08rem .16rem;
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: .32rem;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.7);
        line-height: 1;
        border-top-left-radius: .24rem;
      }
    }
    .vdo-info {
      display: flex;
      padding: .32rem 0;
      align-items: center;
      border: .0267rem solid #cccccc;
      margin: .32rem;
      line-height: 1.3;
      .pic {
        width: 2.1333rem;
      }
      .name {
        font-size: .3467rem;
        margin-left: .32rem;
        .play-count {
          margin-top: .16rem;
          font-size: .32rem;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.error {
  color: red !important;
  background-color: black !important;
  padding: .32rem .48rem !important;
}
</style>