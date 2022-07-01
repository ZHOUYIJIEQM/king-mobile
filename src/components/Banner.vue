<template>
  <swiper 
    class="mySwiper" 
    :autoplay="autoPlay" 
    :pagination="pagination" 
    :modules="modules"
  >
    <swiper-slide 
      class="slide-item" 
      v-for="(item, index) in swiperData" :key="index"
    >
      <a :href="item.url" class="img-box">
        <img :src="item.img" alt="">
      </a>
    </swiper-slide>
  </swiper>
</template>
<script lang="ts">
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    swiperData: {
      type: Array,
      required: true,
      default: () => []
    },
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
      autoPlay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        clickable: true,
        // renderBullet: function (index, className) {
        //   // return '<span class="' + className + '">' + (index + 1) + "</span>";
        //   return '<span class="' + className + '">' + "</span>";
        // },
      },
    };
  },
};
</script>
<style lang="scss" scoped>
.mySwiper {
  height: 100%;
  .slide-item {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  :deep(.swiper-pagination) {
    text-align: right;
    padding-right: .5333rem;

    .swiper-pagination-bullet {
      border-radius: 2px;
      background-color: #fff;
      opacity: 1;
      width: .24rem;
      height: .24rem;

      &-active {
        background-color: #4b67af;
      }
    }
  }
}
</style>