<template>
  <div class="progress-demo">
    <t-progress :percentage="customPercentage" track-color="#EAC9FF" color="#CD04FF">
      <template #label>
        <span class="label--color">{{ customPercentage }}%</span>
      </template>
    </t-progress>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const customPercentage = ref(88);
</script>
<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
  .label--color {
    color: #d504d9;
  }
}
</style>
