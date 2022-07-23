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
    <div class="article-nav eli" v-if="articleData.title">
      <div class="back" @click="$router.go(-1)">&lt;</div>
      <div class="title eli">{{articleData.title}}</div>
      <div class="time">{{articleData.createTime.split(' ').at(0)}}</div>
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
  console.log(params);
  let res = await app.proxy.$Resources.getResources(params)
  articleData.value = res.data
  console.log('文章详情', articleData.value);
}

onMounted(async () => {
  await getArticle(Object.assign({id: $route.params.articleId}, { type: 'article' }))
})
</script>
<style lang="scss" scoped>
.article-detail-page {
  padding-top: calc(1.2rem + 1.0933rem);

  .article-nav {
    background-color: #fff;
    position: fixed;
    width: 100%;
    top: 1.2rem;
    left: 0;
    font-size: .4267rem;
    border-bottom: 1px solid #d4d4d5;
    padding: .32rem .32rem;
    display: flex;
    align-items: center;
    .back {
      font-weight: bold;
      color: #4394e4;
      padding-right: .32rem;
    }
    .title {
      font-weight: bold;
      flex: 1;
      color: #4394e4;
    }
    .time {
      font-size: .32rem;
      padding-left: .24rem;
    }
  }

  :deep(.article-content) {
    padding: .32rem;
    p {
      overflow: hidden;
    }
    img {
      width: auto;
      max-width: 100%;
      height: auto !important;
      margin: .16rem auto;
    }
  }
}
</style>