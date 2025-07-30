<template>
  <div id="toast-demo" class="toast-demo">
    <t-button block size="large" theme="primary" variant="outline" @click="showText()">纯文本</t-button>
    <t-button block size="large" theme="primary" variant="outline" @click="showMultiText()">多行文字</t-button>
    <t-button block size="large" theme="primary" variant="outline" @click="showHorizontalText()">带横向图标</t-button>
    <t-button block size="large" theme="primary" variant="outline" @click="showVerticalText()">带竖向图标</t-button>
    <t-button block size="large" theme="primary" variant="outline" @click="showLoading()">加载状态</t-button>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';

const showText = () => {
  Toast('轻提示文字内容');
};
const showMultiText = () => {
  Toast('最多一行展示十个汉字宽度限制最多不超过三行文字行文字行文字');
};
const showHorizontalText = () => {
  Toast({
    attach: '#toast-demo',
    className: 'toast-root--test',
    style: { backgroundColor: 'pink' },
    duration: 10000,
    theme: 'success',
    direction: 'row',
    message: '轻提示文字内容',
  });
};
const showVerticalText = () => {
  Toast({
    theme: 'success',
    direction: 'column',
    message: '轻提示文字内容',
  });
};
const showLoading = () => {
  Toast({
    theme: 'loading',
    message: '轻提示文字内容',
  });
};
</script>
