<template>
  <div class="button-demo button-demo-closeall">
    <t-button block size="large" variant="outline" theme="primary" @click="openAllMessage">打开多个通知</t-button>
    <t-button block size="large" variant="outline" theme="primary" @click="closeAllMessage">关闭所有通知</t-button>
  </div>
</template>

<script lang="ts" setup>
import { MessagePlugin } from 'tdesign-mobile-vue';

const showMessage = ({
  theme,
  content = '这是一条通知信息',
  duration = 5000,
  index,
}: {
  theme: string;
  content?: string;
  duration?: number;
  index: number;
}) => {
  if (MessagePlugin[theme]) {
    MessagePlugin[theme]({
      offset: [58 * index + 10, 16],
      content,
      duration,
      icon: true,
      zIndex: 20000,
      context: document.querySelector('.button-demo-closeall'),
    });
  }
};

const closeAllMessage = () => MessagePlugin.closeAll();

const openAllMessage = () => {
  ['info', 'warning', 'success', 'error'].forEach((theme, index) => {
    setTimeout(() => {
      showMessage({ theme, index });
    }, 300 * index);
  });
};
</script>
