<template>
  <div id="msg-box" v-if="visible">
    <div class="msg-text">{{ msgText }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const visible = ref<boolean>(false);
const msgText = ref<string>("");

const show = (msg: string, timer: number = 2000) => {
  msgText.value = msg;
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, timer);
};

defineExpose({
  show,
});
</script>
<style scoped lang="scss">
#msg-box {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  .msg-text {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    color: white;
    font-size: 14px;
    padding: 10px 20px;
    user-select: none;
  }
}
</style>
