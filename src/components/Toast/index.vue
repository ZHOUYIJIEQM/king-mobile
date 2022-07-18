<template>
  <transition name="fade">
    <div class="toast-text" v-if="visible" :class="toastObj.className">
      {{ toastObj.msg }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ToastType } from "../../models/toast";

let timer: any = null
const visible = ref<boolean>(false);
const toastObj: ToastType = reactive({ msg: "" });

/**
 * 提示
 */
const ToastShow = (params: ToastType) => {
  const { msg, duration = 2000, className = "" } = params;
  toastObj.msg = msg;
  toastObj.className = className;
  visible.value = true;
  clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false;
    toastObj.msg = "";
  }, duration);
};

defineExpose({
  ToastShow,
});
</script>
<style scoped lang="scss">
.toast-text {
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
}
</style>
