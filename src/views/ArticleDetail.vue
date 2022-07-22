<template>
  <div class="article-detail-page">
    {{$route.params}}
  </div>
</template>
<script lang="ts">
export default {
  name: 'ArticleDetailExclude'
}
</script>
<script lang="ts" setup>
import { getCurrentInstance, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const $route = useRoute()
const app: any = getCurrentInstance()

async function getArticle(params: any) {
  console.log(params);
  let res = await app.proxy.$Resources.getResources(params)
  console.log('文章详情', res);
}

onMounted(async () => {
  console.log($route.params);
  await getArticle(Object.assign({id: $route.params.articleId}, { type: 'article' }))
})
</script>
<style lang="scss" scoped>

</style>