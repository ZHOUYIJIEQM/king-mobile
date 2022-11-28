<template>
  <div class="global-toast" :class="className">
    {{ msg }}
  </div>
</template>
<script lang="ts" setup>
interface toastType {
  msg: string;
  className?: string | string[]
}
const props = withDefaults(defineProps<toastType>(), {
  msg: '',
  className: ''
})
</script>
<style lang="scss" scoped>
.global-toast {
  width: max-content;
  max-width: 75%;
  z-index: 9999;
  font-size: 0.3733rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: hsl(0deg 0% 0% / 70%);
  border-radius: 0.16rem;
  color: #fff;
  padding: 0.24rem 0.4rem;
  box-shadow: 0px 2px 6px black;

  &.show {
    animation: fadeIn .5s;
  }

  &.hide {
    animation: fadeOut .5s both;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>