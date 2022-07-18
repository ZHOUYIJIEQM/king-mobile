<template>
  <div class="hero-box-comp" v-if="heroData.length">
    <div class="content-box">
      <div class="hero-box" 
        v-for="(item, index) in heroData"
        :key="index"
        :class="{active: activeIndex === index}"
      >
        <div class="hero-item"
          v-for="(i, j) in item.dataList"
          :key="j"
          @click="selectHero(i.name)"
        >
          <img :src="i.avatar" alt="">
          <p class="name">{{i.name}}</p>
        </div>
      </div>
    </div>
    <div class="title-box">
      <div class="title-item"
        v-for="(item, index) in heroData"
        :key="index"
        :class="{active: activeIndex === index}"
        @click="changeActive(index)"
      >
        {{item.name}}
      </div>
    </div>
    
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { strategyStore } from "../store/strategy";
import type { heroType } from '../models/hero'

interface heroDataType {
  name: string;
  dataList: heroType[]
}
const props = withDefaults(
  defineProps<{
    heroData: heroDataType[];
  }>(),
  {
    heroData: () => [],
  }
);

const emit = defineEmits<{
  (e: 'heroChange', name: string): void
}>()

let activeIndex = ref<number>(0)
const changeActive = (index: number) => {
  activeIndex.value = index
}

const selectHero = (hero: string) => {
  strategyStore().changeHeroName(hero)
  emit('heroChange', hero)
}

</script>
<style lang="scss" scoped>
.hero-box-comp {
  display: flex;
  .content-box {
    border: .0267rem solid #e5e5e5;
    border-right: none;
    position: relative;
    flex: 1;
    .hero-box {
      padding: .24rem;
      height: 100%;
      overflow-y: auto;
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      &.active {
        display: block;
      }
      .hero-item {
        display: inline-block;
        width: 22%;
        margin-right: 4%;
        margin-bottom: .32rem;
        &:nth-child(4n+4) {
          margin-right: 0;
        }
        img {
          width: 100%;
        }
        p {
          margin-top: .08rem;
          font-size: .32rem;
          text-align: center;
        }
      }
    }
  }
  .title-box {
    background-color: #f5f5f5;
    width: 2.08rem;
    .title-item {
      flex: 1;
      height: 1rem;
      font-size: .32rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background-color: #db9e3f;
        color: #fff;
      }
    }
  }
}
</style>