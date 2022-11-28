<template>
  <div class="vdo-info" @click="goPage({name: 'videoDetail', params: {'videoId': videoInfo.vdoId}})">
    <div class="vdo-pre">
      <img :src="videoInfo.img" alt="">
      <span class="play-icon"></span>
      <span class="play-duration" v-show="videoInfo?.iTime?.length">{{videoInfo.iTime}}</span>
    </div>
    <div class="vdo-text">
      <p class="title two-eli">{{videoInfo.name}}</p>
      <div class="play-count">
        <span class="vdo-icon"></span>
        <span class="count">{{videoInfo.playCount}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const $router = useRouter();
const goPage = (params: any) => {
  $router.push(params)
}

interface vdoType {
  author: string;
  iTime: string;
  img: string;
  name: string;
  playCount: string;
  vdoId: string;
}
const props = defineProps<{
  videoInfo: vdoType
}>()

</script>
<style lang="scss" scoped>
.vdo-info {
    color: #222;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  .vdo-pre {
    position: relative;
    font-size: 0;
    img {
      width: 100%;
      aspect-ratio: 686/385;
    }
    .play-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: url('../assets/spr.png') no-repeat;
      background-size: 2.5rem;
      width: 1.3333rem;
      aspect-ratio: 1;
      display: inline-block;
      background-position: -0.48rem -1.0133rem;
    }
    .play-duration {
      background-color: rgba(23, 23, 23, 0.7);
      color: #fff;
      padding: .1rem;
      position: absolute;
      bottom: 0;
      right: 0;
      font-size: .2667rem;
    }
  }
  .vdo-text {
    font-size: 0.3467rem;
    margin-bottom: 0.1333rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .title {
      margin: .1333rem 0;
      line-height: 1.3;
    }
    .play-count {
      font-size: .2667rem;
      display: flex;
      align-items: center;
      color: #626262;
      .vdo-icon {
        background: url('../assets/spr.png') no-repeat;
        background-size: 2.48rem;
        width: .5333rem;
        aspect-ratio: 1/0.6;
        display: inline-block;
        background-position: .08rem -1.2rem;
      }
    }
    margin-bottom: .1333rem;
  }
}
</style>