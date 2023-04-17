<template>
  <div class="toast-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="showFail('失败文案')">失败提示</t-button>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';

const showFail = (message: string) => {
  Toast({
    theme: 'error',
    direction: 'column',
    message,
  });
};
</script>
