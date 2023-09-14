<template>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">自定义评分</div>
    <t-rate v-model="value" :icon="[ThumbUpIcon, ThumbUpIcon]" @change="changeValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ThumbUpIcon } from 'tdesign-icons-vue-next';

const changeValue = (val: Number) => {
  console.log('current value is', val);
};
const value = ref(3);
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
}
</style>
