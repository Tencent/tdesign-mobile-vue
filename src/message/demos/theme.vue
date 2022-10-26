<template>
  <div class="button-demo" style="margin: 0 16px">
    <t-button block size="large" variant="outline" @click="showInfoMessage">普通通知</t-button>
    <t-button block size="large" variant="outline" @click="showWarnMessage">警示提示通知</t-button>
    <t-button block size="large" variant="outline" @click="showSuccessMessage">成功提示通知</t-button>
    <t-button block size="large" variant="outline" @click="showErrorMessage">错误提示通知</t-button>
  </div>
</template>

<script lang="ts" setup>
import Message from '../index';

const showInfoMessage = () =>
  Message.info({
    offset: [20, 32],
    duration: 5000,
    content: '这是一条普通通知信息',
  });

const showWarnMessage = () =>
  Message.warning({
    offset: [20, 32],
    duration: -1,
    content: '这是一条需要用户关注到的警示通知',
  });

const showSuccessMessage = () =>
  Message.success({
    offset: [20, 32],
    duration: -1,
    content: '这是一条需要成功的提示消息',
  });

const showErrorMessage = () =>
  Message.error({
    offset: [20, 32],
    duration: -1,
    content: '这是一条错误提示通知',
  });
</script>
