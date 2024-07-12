<template>
  <div class="toast-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="showSuccessToast()">成功提示</t-button>
    <t-button block size="large" theme="primary" variant="outline" @click="showWarningToast()">警告提示</t-button>
    <t-button block size="large" theme="primary" variant="outline" @click="showErrorToast()">错误提示</t-button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Toast } from 'tdesign-mobile-vue';
import { ErrorCircleIcon } from 'tdesign-icons-vue-next';

const showSuccessToast = () => {
  Toast({
    className: 'toast-root--success',
    duration: 50000,
    theme: 'success',
    direction: 'column',
    message: '轻提示文字内容',
  });
};
const showWarningToast = () => {
  Toast({
    icon: () => h(ErrorCircleIcon),
    direction: 'column',
    message: '轻提示文字内容',
  });
};
const showErrorToast = () => {
  Toast({
    theme: 'error',
    direction: 'column',
    message: '轻提示文字内容',
  });
};
</script>
