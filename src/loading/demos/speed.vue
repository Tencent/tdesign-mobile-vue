<template>
  <t-loading :duration="(1 / loadingDuration) * 3000" text="加载中..." />
  <div class="slider-wrap">
    <t-slider v-model="loadingDuration" :min="0" :max="10" :label="false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const loadingDuration = ref(5);
</script>

<style scoped>
.slider-wrap {
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;
}
</style>
