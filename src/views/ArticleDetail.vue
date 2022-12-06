<template>
  <div class="article-detail-page">
    <div class="navbar">
      <span @click="router.push({name: 'home'})">王者荣耀</span>
      <span style="font-size: 12px;" @click="router.replace({name: 'HeroList'})">更多英雄></span>
    </div>
    <div class="detail-nav eli" v-if="articleData.title || articleData.name">
      <div class="back" @click="router.go(-1)">&lt;</div>
      <div class="title eli">{{articleData.title || articleData.name}}</div>
      <div class="time">{{formatDate(articleData.createdTime)}}</div>
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
import resApi from '@/api/resource';
const route = useRoute()
const router = useRouter()
const articleData = ref<any>({})

async function getArticle(params: any) {
  let res = await resApi.getResources(params)
  articleData.value = res.data
}

const formatDate = (str: string|number): string => {
  const f = (val: number): string => {
    return val < 10 ? `0${val}` : `${val}`;
  };
  const d = new Date(str);
  return `${d.getFullYear()}-${f(d.getMonth() + 1)}-${f(d.getDate())}`;
};

onMounted(async () => {
  await getArticle(Object.assign({id: route.params.articleId}, { type: 'article' }))
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
    font-size: 16px !important;
    line-height: 1.4;
    span {
      font-size: 14px !important;
      line-height: 1.3;
    }
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