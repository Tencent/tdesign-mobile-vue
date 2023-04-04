<template>
  <div class="button-demo" style="margin: 0 16px">
    <p class="summary">普通通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showInfoMessage">普通通知</t-button>
    <p class="summary">成功通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showSuccessMessage">成功通知</t-button>
    <p class="summary">警示通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showWarnMessage">警示通知</t-button>
    <p class="summary">错误通知</p>
    <t-button block size="large" variant="outline" theme="primary" @click="showErrorMessage">错误通知</t-button>
  </div>
</template>

<script lang="ts" setup>
import Message from '../index';

const showMessage = (theme: string, content = '这是一条普通的通知信息', duration = 5000) => {
  if (Message[theme]) {
    Message[theme]({
      offset: [20, 32],
      content,
      duration,
      icon: true,
    });
  }
};

const showInfoMessage = () => showMessage('info');

const showWarnMessage = () => showMessage('warning');

const showSuccessMessage = () => showMessage('success');

const showErrorMessage = () => showMessage('error');
</script>

<script lang="ts">
export default {
  name: 'ThemeDemo',
};
</script>

<style lang="less" scoped>
.tdesign-mobile-demo-block__slot {
  margin-top: 8px;
  .t-button {
    border-radius: 6px;
    &.t-size-l {
      height: 48px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.tdesign-mobile-demo .summary {
  margin: 8px 0 16px;
  display: inline-block;
}
</style>
