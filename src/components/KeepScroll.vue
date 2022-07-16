<template>
  <!-- 保存滚动高度 -->
  <slot></slot>
</template>
<script lang="ts" setup>
import { onActivated } from "vue";
import { onBeforeRouteLeave } from "vue-router";

// 保存页面滚动高度
const getPageY = () => {
  return (
    document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
  );
};
let pageY = 0;
onActivated(() => {
  window.scrollTo(0, pageY);
});
onBeforeRouteLeave((to, from) => {
  pageY = getPageY();
});
</script>
