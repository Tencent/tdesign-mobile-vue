<template>
  <p class="summary">只可选全星时</p>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">点击或滑动</div>
    <t-rate v-model="value1" variant="filled" />
  </div>
  <p class="summary">可选半星时</p>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">点击或滑动</div>
    <t-rate v-model="value2" variant="filled" allow-half />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref(3);
const value2 = ref(3);
</script>

<style lang="less" scoped>
.summary {
  margin-top: 8px;
  font-size: 14px;
  white-space: pre-line;
  color: rgba(0, 0, 0, 0.6);
  line-height: 22px;
}
.rate-demo-cell {
  background-color: var(--bg-color-demo, #fff);
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  &__label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 80px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }

  &--space {
    margin-bottom: 16px;
  }
}
</style>
