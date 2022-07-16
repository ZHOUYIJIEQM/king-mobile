<template>
  <div class="nav-banner-box" v-if="navSwiperData.length">
    <slot name="title" :swiperTitle="title" :swiperEl="swiperRef"></slot>
    <div class="title-box" v-if="!customTitle" ref="titleBox">
      <span
        ref="titleItem"
        v-for="(i, j) in title"
        :key="j"
        :class="{active: j === activeIndex}"
        @click="changeActive(j)"
      >{{ i }}</span>
    </div>
    <swiper 
      class="news-swiper" 
      :resistanceRatio="0"
      @swiper="newsSwiper"
      @slide-change="slideChange"
      :autoHeight="autoHeight"
    >
      <swiper-slide
        class="slide-item"
        v-for="(item, index) in navSwiperData"
        :key="index"
      >
        <slot name="slideItem" :swiperItem="item"></slot>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { ref, watch } from "vue";
import { height } from "dom7";

interface swiperType {
  name: string;
  dataList: any[];
}
const props = withDefaults(
  defineProps<{
    navSwiperData: swiperType[];
    customTitle?: boolean,
    autoHeight?: boolean,
  }>(),
  {
    navSwiperData: () => [],
    customTitle: false,
    autoHeight: true,
  }
);

let activeIndex = ref<number>(0)
const title = ref<string[]>([]);
watch(
  () => props.navSwiperData,
  (newV, oldV) => {
    title.value = newV.map((i) => i.name);
  },
  {
    immediate: true,
    deep: true,
  }
);

const changeActive = (index: number) => {
  activeIndex.value = index
  swiperRef.value.slideTo(index)
}

const emit= defineEmits<{
  (e: 'slidechange', num: number): void
}>()

// swiper instance
const swiperRef = ref()
let titleItem = ref()
let titleBox = ref()
const slideChange = () => {
  const index = swiperRef.value.activeIndex
  activeIndex.value = index
  emit('slidechange', index)

  let itemInfo = titleItem.value[index].getBoundingClientRect()
  let left = 0
  if (itemInfo.left < 0) {
    left = titleItem.value[index].offsetLeft - parseInt(getComputedStyle(titleBox.value, null).paddingLeft)
    titleBox.value.scrollTo({
      left,
      behavior: "smooth"
    })
  }
  if (itemInfo.left > titleBox.value.offsetWidth - parseInt(getComputedStyle(titleItem.value[index], null).marginRight)) {
    left = titleItem.value[index].offsetLeft - titleBox.value.offsetWidth + itemInfo.width + parseInt(getComputedStyle(titleItem.value[index], null).marginRight)
    titleBox.value.scrollTo({
      left,
      behavior: "smooth"
    })
  }
}
const newsSwiper = (swiperInstance: any) => {
  swiperRef.value = swiperInstance
}

</script>

<style lang="scss" scoped>
.nav-banner-box {
  .title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .48rem .4rem;
    font-size: .3733rem;
    span {
      color: #343440;
      &.active {
        color: #db9e3f;
        position: relative;
        &::after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          bottom: -0.16rem;
          border-bottom: .0933rem solid #db9e3f;
        }
      }
    }
  }

}
</style>
