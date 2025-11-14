<template>
  <div class="wrapper">
    <t-slider :label="true" :on-change="onChange" :value="value" />
  </div>
  <tdesign-demo-block summary="带数值双游标滑块">
    <div class="wrapper">
      <t-slider :default-value="[20, 60]" :label="handleLabel" range show-extreme-value />
    </div>
  </tdesign-demo-block>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(10);
const onChange = (e: number) => {
  value.value = e;
};

const handleLabel = (value: any) => {
  return value;
};
</script>

<style lang="less" scoped>
.wrapper {
  background: var(--bg-color-demo, #fff);
  margin-top: 16px;
  padding: 18px 0;
}
</style>
