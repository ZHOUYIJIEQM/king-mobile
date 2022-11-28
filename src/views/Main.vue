<template>
  <div class="main-nav">
    <Navbar></Navbar>
  </div>
  <div class="main-content">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<style lang="scss" scoped>
.main-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
}
.main-content {
  $navHeight: 1.12rem;
  box-sizing: border-box;
  padding-top: $navHeight;
  height: 100%;
}
</style>