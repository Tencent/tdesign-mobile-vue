<template>
  <div class="wrapper">
    <t-slider
      :default-value="23"
      :label="handleLabel"
      vertical
      @change="onChange"
      @dragend="onDragend"
      @dragstart="onDragstart"
    />
  </div>
  <div class="wrapper">
    <t-slider :default-value="rangeValue" :marks="marks" :step="20" range vertical @change="onChange" />
  </div>
  <div class="wrapper">
    <t-slider :default-value="23" label="handleLabel" theme="capsule" vertical @change="onChange" />
  </div>

  <div class="wrapper">
    <t-slider :default-value="[20, 80]" :marks="marks" :step="20" range theme="capsule" vertical @change="onChange" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(10);
const rangeValue = ref([20, 80]);
const marks = {
  0: '0',
  20: '20',
  40: '40',
  60: '60',
  80: '80',
  100: '100',
};

const onChange = (e: number) => {
  console.log(`[onChange] ${e}`);
};

const onDragend = (value: number, e: TouchEvent) => {
  console.log('[onDragend] ', value, e);
};

const onDragstart = (e: TouchEvent) => {
  console.log('[onDragstart] ', e);
};

const handleLabel = (value: any) => {
  return value;
};
</script>
<style lang="less" scoped>
.wrapper {
  background: var(--bg-color-demo, #fff);
  padding: 18px 0;
  margin-bottom: 16px;
}
</style>
