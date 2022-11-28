<template>
  <swiper
    v-if="swiperData.length"
    class="mySwiper"
    :loop="true"
    :modules="modules"
  >
    <swiper-slide
      class="slide-item"
      v-for="(item, index) in swiperData"
      :key="index"
    >
      <div class="img-box">
        <img :src="item.img" alt="" />
      </div>
      <p>{{ item.name }}</p>
      <div class="page" v-if="swiperData.length">
        {{ index + 1 }}/{{ swiperData.length }}
      </div>
    </swiper-slide>
  </swiper>
  <div class="banner-loading loading-skeleton" v-else></div>
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
      default: () => [],
    },
  }, 
  setup() {
    return {
      modules: [Pagination],
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
  .slide-item {
    height: 100%;
    .img-box {
      background-color: #383838;
      width: 100%;
      aspect-ratio: 375/552;
      img {
        width: 100%;
      }
    }
    p {
      font-size: 14px;
      text-align: center;
      line-height: 2;
    }
  }
}
.page {
  font-size: 0.3733rem;
  text-align: center;
}
.banner-loading {
  min-height: 4.2667rem;
}
</style>
