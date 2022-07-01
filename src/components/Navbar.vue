<template>
  <div class="navbar-comp" :style="{ background: backgroundColor }">
    <div 
      v-for="(item, index) in navTitle" 
      :key="index" 
      @click="tapNavbar(index)"
      :class="{active: index === activeIndex}"
    >
      {{ item.title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue';

interface NavBar {
  title: string,
  name: string
}

interface Props {
  // navTitle?: Array<NavBar>,
  navTitle?: NavBar[],
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  navTitle: function () {
    return [
      {
        title: '首页',
        name: 'home'
      },
      {
        title: '攻略中心',
        name: 'strategy'
      },
      {
        title: '赛事中心',
        name: 'race'
      }
    ]
  },
  backgroundColor: '#db9e3f'
})

// 菜单项
let activeIndex = ref<number>(0)
const tapNavbar = (index: number) => {
  activeIndex.value = index
  // todo: 路由跳转
}


</script>
<style lang="scss" scoped>
$navHeight: 42px;

.navbar-comp {
  height: $navHeight;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  font-size: .3733rem;

  &>div {
    position: relative;
    &.active::after {
      content: "";
      display: block;
      width: 100%;
      height: .08rem;
      background: #fff;
      position: absolute;
      bottom: -0.1867rem;
    }
  }

}
</style>