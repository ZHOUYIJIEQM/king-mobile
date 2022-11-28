<template>
  <swiper
    class="banner"
    v-if="swiperData.length"
    :autoplay="autoPlay"
    :pagination="pagination"
    :loop="true"
    :modules="modulesObj"
  >
    <swiper-slide
      class="slide-item"
      v-for="(item, index) in swiperData"
      :key="index"
    >
      <slot :slideItem="item"></slot>
    </swiper-slide>
  </swiper>
  <div class="banner-loading loading-skeleton" v-else></div>
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";

const props = withDefaults(
  defineProps<{
    swiperData: any[];
    modules: any[];
    autoPlay?: any;
    pagination?: any;
    loop?: boolean;
  }>(),
  {
    swiperData: () => [],
    autoPlay: () => ({ delay: 3000, disableOnInteraction: false }),
    pagination: () => ({ clickable: true }),
    modules: () => [],
    loop: false,
  }
);
const swiperMap: any = {
  Autoplay: Autoplay,
  Pagination: Pagination,
};
let modulesObj = computed<any[]>(() => {
  if (props.modules.length) {
    return props.modules.map((i) => swiperMap[i]);
  }
  return [];
});
</script>
<style lang="scss" scoped>
.banner {
  min-height: 2.6667rem;
  height: 100%;
  font-size: 0;

  .slide-item {
    height: 100%;

    .img-box {
      display: inline-block;
      img {
        width: 100%;
      }
    }
  }

  :deep(.swiper-pagination) {
    text-align: right;
    padding-right: 0.2667rem;

    .swiper-pagination-bullet {
      border-radius: 2px;
      background-color: #fff;
      opacity: 1;
      width: 0.24rem;
      height: 0.24rem;

      &-active {
        background-color: #4b67af;
      }
    }
  }
}

.banner-loading {
  min-height: 4.24rem;
}
</style>
