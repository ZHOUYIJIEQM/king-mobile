<template>
  <div class="main-nav">
    <NavbarVue></NavbarVue>
  </div>
  <div class="main-content">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import NavbarVue from '../components/Navbar.vue';
</script>
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
  padding-top: $navHeight;
  height: 100%;
}
</style>