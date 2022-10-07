<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="/.*Exclude$/">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>