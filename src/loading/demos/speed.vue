<template>
  <t-loading :duration="loadingDuration" text="加载中..." />
  <div class="slider-wrap">
    <span :style="{ width: '120px', 'margin-right': '10px' }"> 速度调整 </span>
    <t-slider v-model="loadingDuration" show-extreme-value :min="0" :max="800" :label="false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loadingDuration = ref(300);
</script>

<style scoped>
.slider-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
</style>
