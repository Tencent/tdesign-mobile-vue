<template>
  <div style="display: flex; flex-direction: column">
    <div class="button-group">
      <t-button class="button" variant="text" :disabled="size <= minSize" @click="size -= 10">- Smaller</t-button>
      <div class="line"></div>
      <t-button class="button" variant="text" :disabled="size >= maxSize" @click="size += 10">+ Larger</t-button>
    </div>
    <div class="container">
      <t-qrcode :size="size" value="https://tdesign.tencent.com/" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const minSize = 80;
const maxSize = 240;

const size = ref(160);
</script>

<style lang="less" scoped>
.button-group {
  width: 100%;
  display: flex;
  padding: 0;
  border: 1px solid var(--td-component-border);
  border-radius: 6px;
  margin-bottom: 16px;
  overflow: hidden;

  .line {
    height: auto;
    width: 1px;
    background-color: var(--td-component-border);
  }

  .button {
    flex: 1;

    --td-button-border-radius: 0px;
  }
}

.container {
  display: flex;
  height: 320px;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  background: var(--td-bg-color-secondarycontainer);
}
</style>
