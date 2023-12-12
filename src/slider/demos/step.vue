<template>
  <div class="wrapper">
    <t-slider v-model="value" :marks="marksRange" :min="5" :max="10" :step="0.5" />
  </div>

  <div class="wrapper">
    <t-slider range :default-value="[20, 60]" :marks="marks" :step="20" />
  </div>
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
