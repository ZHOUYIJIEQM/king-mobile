<template>
  <div class="navbar-comp" :style="{ background: backgroundColor }">
    <div
      v-for="(item, index) in navTitle"
      :key="index"
      @click="tapNavbar(index)"
      :class="{ active: index === activeIndex }"
    >
      {{ item.title }}
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();
const route = useRoute();

watch(
  () => route.name,
  (newV) => {
    let l = ["home", "strategy", "race"];
    let index = l.findIndex((i) => i === newV);
    // console.log('路由变了', newV);
    if (index !== -1) {
      activeIndex.value = index;
    }
  },
  { deep: true }
);

interface NavBar {
  title: string;
  name: string;
}

interface Props {
  // navTitle?: Array<NavBar>,
  navTitle?: NavBar[];
  backgroundColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  navTitle: function () {
    return [
      {
        title: "首页",
        name: "home",
      },
      {
        title: "攻略中心",
        name: "strategy",
      },
      {
        title: "赛事中心",
        name: "race",
      },
    ];
  },
  backgroundColor: "#db9e3f",
});

// 菜单项
const activeIndex = ref<number>(0);
const tapNavbar = (index: number) => {
  activeIndex.value = index;
  router.push({
    name: props.navTitle[index].name,
  });
};

// 初始化活动项
activeIndex.value = props.navTitle.findIndex((i) => i.name === route.name);
</script>
<style lang="scss" scoped>
$navHeight: 1.12rem;

.navbar-comp {
  height: $navHeight;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  font-size: 0.3733rem;

  & > div {
    position: relative;
    &.active::after {
      content: "";
      display: block;
      width: 100%;
      height: 0.08rem;
      background: #fff;
      position: absolute;
      bottom: -0.1867rem;
    }
  }
}
</style>
