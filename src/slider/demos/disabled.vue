<template>
  <div class="wrapper">
    <t-slider :value="35" disabled />
  </div>

  <div class="wrapper">
    <t-slider show-extreme-value label="${value}" :value="[40, 60]" range disabled />
  </div>

  <div class="wrapper">
    <t-slider range :value="[20, 60]" :marks="marks" :step="20" disabled />
  </div>
</template>
<script lang="ts" setup>
const marks = {
  0: '0',
  20: '20',
  40: '40',
  60: '60',
  80: '80',
  100: '100',
};
</script>
<style lang="less" scoped>
.wrapper {
  background: var(--bg-color-demo, #fff);
  margin-top: 16px;
  padding: 18px 0;
}
</style>
