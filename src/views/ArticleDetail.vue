<template>
  <div class="article-detail-page">
    <div class="navbar">
      <span @click="$router.push({name: 'home'})">王者荣耀</span>
      <!-- todo: 跳转到英雄列表 -->
      <span 
        style="font-size: 12px;"
        @click="$router.replace({name: 'HeroList'})"
      >更多英雄></span>
    </div>
    <div class="detail-nav eli" v-if="articleData.title || articleData.name">
      <div class="back" @click="$router.go(-1)">&lt;</div>
      <div class="title eli">{{articleData.title || articleData.name}}</div>
      <div class="time">{{articleData.createdTime.split(' ').at(0)}}</div>
    </div>
    <div class="article-content" v-html="articleData.content"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ArticleDetailExclude'
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute()
const app: any = getCurrentInstance()

let articleData = ref<any>({})
async function getArticle(params: any) {
  // console.log(params);
  let res = await app.proxy.$Resources.getResources(params)
  articleData.value = res.data
  // console.log('文章详情', articleData.value);
}

onMounted(async () => {
  await getArticle(Object.assign({id: $route.params.articleId}, { type: 'article' }))
})
</script>
<style lang="scss" scoped>
.article-detail-page {
  padding-top: calc(1.2rem + 1.0933rem);

  .detail-nav {
    .time {
      font-size: .32rem;
      padding-left: .24rem;
    }
  }

  :deep(.article-content) {
    padding: .32rem;
    font-size: 16px;
    line-height: 1.4;
    p {
      overflow: hidden;
    }
    iframe, video, img {
      width: auto;
      max-width: 100%;
      height: auto !important;
      margin: .16rem auto;
    }
  }
}
</style>