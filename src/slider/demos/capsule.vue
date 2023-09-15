<template>
  <div class="wrapper">
    <t-slider :default-value="30" theme="capsule" />
  </div>

  <div class="wrapper">
    <t-slider :default-value="[40, 60]" range theme="capsule" />
  </div>

  <div class="wrapper">
    <t-slider :default-value="[40, 60]" range label="${value}" theme="capsule" />
  </div>

  <div class="wrapper">
    <t-slider :default-value="60" :marks="marks" :step="20" theme="capsule" />
  </div>

  <div class="wrapper">
    <t-slider :default-value="[20, 80]" range :marks="marks" :step="20" theme="capsule" />
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
  padding: 16px 0;
}
</style>
