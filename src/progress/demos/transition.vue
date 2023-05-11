<template>
  <div class="example-progress">
    <t-progress :percentage="percentage" />
    <div class="button-group">
      <t-button theme="primary" variant="outline" size="small" @click="clickReduce">减少</t-button>
      <div class="space"></div>
      <t-button theme="primary" size="small" @click="clickAdd">增加</t-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const percentage = ref(88);

function clickAdd() {
  percentage.value = Math.min(100, percentage.value + 10);
}
function clickReduce() {
  percentage.value = Math.max(0, percentage.value - 10);
}
</script>
<style lang="less" scoped>
.example-progress {
  .button-group {
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
    .space {
      width: 16px;
    }
  }
}
</style>
