<template>
  <div class="toast-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="showSuccess('成功文案')">成功提示</t-button>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';

const showSuccess = (message?: string) => {
  Toast({
    theme: 'success',
    direction: 'column',
    message,
  });
};
</script>
