<template>
  <div class="button-demo">
    <t-button block size="large" variant="outline" theme="primary" @click="showInfoMessage">普通通知</t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showSuccessMessage">成功通知</t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showWarnMessage">警示通知</t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="showErrorMessage">错误通知</t-button>
  </div>
</template>

<script lang="ts" setup>
import { Message } from 'tdesign-mobile-vue';

const showMessage = (theme: string, content = '这是一条普通通知信息', duration = 5000) => {
  if (Message[theme]) {
    Message[theme]({
      offset: [10, 16],
      content,
      duration,
      icon: true,
      zIndex: 20000,
      context: document.querySelector('.button-demo'),
    });
  }
};

const showInfoMessage = () => showMessage('info');

const showWarnMessage = () => showMessage('warning', '这是一条需要用户关注到的警示通知');

const showSuccessMessage = () => showMessage('success', '这是一条成功的提示消息');

const showErrorMessage = () => showMessage('error', '这是一条错误提示通知');
</script>
