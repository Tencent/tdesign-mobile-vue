<template>
  <div class="wrapper">
    <t-slider :value="value" :label="true" :on-change="onChange" />
  </div>
  <div class="wrapper">
    <t-slider range :default-value="[20, 60]" :label="true" show-extreme-value />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(10);
const onChange = (e: number) => {
  value.value = e;
};
</script>

<style lang="less" scoped>
.wrapper {
  background: var(--bg-color-demo, #fff);
  margin-top: 16px;
  padding: 18px 0;
}
</style>
