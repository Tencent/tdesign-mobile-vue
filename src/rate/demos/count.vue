<template>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">自定义评分数量</div>
    <t-rate v-model="value" :count="3" variant="filled" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(2);
</script>

<style lang="less" scoped>
.rate-demo-cell {
  background-color: #fff;
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 80px;
  }
}
</style>
