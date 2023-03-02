<template>
  <div class="toast-demo">
    <t-button block size="large" variant="outline" @click="showPositionAndDuration('top', 1000, '顶部-展示1秒')"
      >顶部展示1秒</t-button
    >
    <t-button block size="large" variant="outline" @click="showPositionAndDuration('middle', 2000, '中间-展示2秒')"
      >中间展示2秒</t-button
    >
    <t-button block size="large" variant="outline" @click="showPositionAndDuration('bottom', 3000, '底部-展示3秒')"
      >底部展示3秒</t-button
    >
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { StarIcon } from 'tdesign-icons-vue-next';
import Toast from '../index';

type Placement = 'top' | 'middle' | 'bottom';

const showPositionAndDuration = (placement: Placement, duration: number, message: string) => {
  Toast({
    placement,
    message,
    duration,
    icon: () => h(StarIcon),
    direction: 'column',
  });
};
</script>
