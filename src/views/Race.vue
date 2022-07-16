<template>
  <KeepScrollVue>
    <div class="">
      赛事中心
    </div>
    <div v-for="(i, j) in 100" :key="j">{{i}}</div>
  </KeepScrollVue>
</template>
<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import KeepScrollVue from '../components/KeepScroll.vue';
const app = getCurrentInstance()
console.log(app.proxy.$HomeReq);
const $toast = app?.appContext.config.globalProperties.$toast
$toast.show('hhh')
</script>
<style lang="scss" scoped>

</style>