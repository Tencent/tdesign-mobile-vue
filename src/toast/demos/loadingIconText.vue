<template>
  <div class="toast-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="showWithIcon(text)">加载状态</t-button>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { Toast } from 'tdesign-mobile-vue';

const text = ref('加载中');
const showWithIcon = (message: string) => {
  Toast({
    theme: 'loading',
    message,
  });
};
</script>
