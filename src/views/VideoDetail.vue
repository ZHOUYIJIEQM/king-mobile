<template>
  <div class="video-detail-page">
    {{$route.params}}
  </div>
</template>
<script lang="ts">
export default {
  name: 'VideoDetailExclude'
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute()
const app: any = getCurrentInstance()

async function getVideoDetail(params: any) {
  console.log(params);
  let res = await app.proxy.$Resources.getResources(params)
  console.log('视频详情', res);
}

onMounted(() => {
  console.log($route.params);
  getVideoDetail(Object.assign({id: $route.params.videoId}, { type: 'video' }))
})
</script>
<style lang="scss" scoped>

</style>