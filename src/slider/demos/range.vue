<template>
  <div class="wrapper">
    <t-slider :default-value="rangeValue" range @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rangeValue = ref([30, 70]);

function onChange($event: number | number[]) {
  console.log(`change to ${$event}`);
}
</script>

<style lang="less" scoped>
.wrapper {
  background: #fff;
  padding: 18px 0;
}
</style>
