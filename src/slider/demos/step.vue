<template>
  <div class="wrapper">
    <t-slider v-model="value" :marks="marks" :step="20" />
  </div>

  <div class="wrapper">
    <t-slider range :default-value="[20, 60]" :marks="marks" :step="20" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(60);
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
  background: #fff;
  margin-top: 16px;
  padding: 18px 0;
}
</style>
