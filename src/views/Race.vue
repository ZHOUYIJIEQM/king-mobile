<template>
  <KeepScrollVue>
    <div class="">
      赛事中心
    </div>
    <div v-for="(i, j) in 100" :key="j">{{i}}</div>
  </KeepScrollVue>
</template>
<script lang="ts" setup>
import { getCurrentInstance, onMounted } from 'vue';
import KeepScrollVue from '../components/KeepScroll.vue';
const app: any = getCurrentInstance()
onMounted(() => {
  app.proxy.$toast({msg: 'toast 提示'})
})
</script>
<style lang="scss" scoped>

</style>