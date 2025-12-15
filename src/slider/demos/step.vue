<template>
  <div class="wrapper">
    <t-slider v-model="value" :marks="marksRange" :max="10" :min="5" :step="0.5" />
  </div>

  <tdesign-demo-block summary="带刻度双游标滑块">
    <div class="wrapper">
      <t-slider :default-value="[20, 60]" :marks="marks" :step="20" range />
    </div>
  </tdesign-demo-block>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(6.5);
const marksRange = ref({
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
});
const marks = ref({
  0: '0',
  20: '20',
  40: '40',
  60: '60',
  80: '80',
  100: '100',
});
</script>

<style lang="less" scoped>
.wrapper {
  background: var(--bg-color-demo, #fff);
  margin-top: 16px;
  padding: 18px 0;
}
</style>
