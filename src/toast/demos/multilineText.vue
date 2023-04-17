<template>
  <div class="toast-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="showText(text)">多行文本</t-button>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue';
import { Toast } from 'tdesign-mobile-vue';

const text = ref('最多一行展示十个汉字宽度限制最多不超过三行文字行文字行文字');
const showText = (message: string) => {
  Toast(message);
};
</script>
