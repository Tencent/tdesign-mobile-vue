<template>
  <div class="rate-demo-cell">
    <div v-if="title" class="rate-demo-cell__label">{{ title }}</div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  title: String,
});
</script>

<style lang="less">
.rate-demo-cell {
  background-color: #fff;
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  &__label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 80px;
  }

  &--space {
    margin-bottom: 16px;
  }
}
</style>
