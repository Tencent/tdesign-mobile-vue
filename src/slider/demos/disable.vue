<template>
  <div class="section">
    <t-slider :default-value="60" disabled />
  </div>
  <div class="section">
    <t-slider :default-value="30" show-extreme-value :min="30" disabled />
  </div>
  <div class="section">
    <t-slider :default-value="50" :marks="marks" disabled />
  </div>
  <div class="section">
    <t-slider :default-value="[30, 80]" range disabled />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const marks = ref({ 0: '小', 50: '中', 100: '大' });
</script>

<style lang="less" scoped>
.section {
  // display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;

  & + .section {
    margin-top: 16px;
  }
}
</style>
