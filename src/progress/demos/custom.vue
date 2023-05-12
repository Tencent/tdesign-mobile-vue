<template>
  <div class="example-progress">
    <div class="example-progress__item">
      <t-progress :percentage="customPercentage" track-color="#EAC9FF" color="#CD04FF">
        <template #label>
          <span class="label--color">{{ customPercentage }}%</span>
        </template>
      </t-progress>
    </div>
    <div class="example-progress__item">
      <t-progress class="radius--round" :percentage="customPercentage"></t-progress>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const customPercentage = ref(88);
</script>
<style lang="less" scoped>
.example-progress {
  background-color: #fff;

  &__item:not(:last-child) {
    margin-bottom: 16px;
  }

  .label--color {
    color: #d504d9;
  }

  .radius--round {
    --td-radius-round: 0px;
  }
}
</style>
