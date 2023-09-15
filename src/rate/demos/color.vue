<template>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">填充评分</div>
    <t-rate v-model="value1" variant="filled" allow-half :color="['#FFC51C', '#E8E8E8']" />
  </div>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">线描评分</div>
    <t-rate v-model="value" allow-half color="#00A870" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(2);
const value1 = ref(3);
</script>

<style lang="less" scoped>
.rate-demo-cell {
  background-color: var(--bg-color-demo, #fff);
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
