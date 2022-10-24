<template>
  <div class="tdesign-demo-block">
    <t-button block size="large" variant="outline" @click="showSuccessRow('成功文案')">成功-横向</t-button>
    <t-button block size="large" variant="outline" @click="showFailRow('失败文案')">警告-横向</t-button>
    <t-button block size="large" variant="outline" @click="showSuccess('成功文案')">成功-竖向</t-button>
    <t-button block size="large" variant="outline" @click="showFail('失败文案')">警告-竖向</t-button>
    <t-button block size="large" variant="outline" @click="showLoading('加载中...')">加载</t-button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { UserIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

const showSuccess = (message?: string) => {
  Toast({
    theme: 'success',
    direction: 'column',
    message,
  });
};
const showFail = (message: string) => {
  Toast({
    theme: 'fail',
    direction: 'column',
    message,
  });
};
const showSuccessRow = (message: string) => {
  Toast({
    theme: 'success',
    direction: 'row',
    message,
  });
};
const showFailRow = (message: string) => {
  Toast({
    theme: 'fail',
    direction: 'row',
    message,
  });
};

const showLoading = (message: string) => {
  Toast({
    theme: 'loading',
    message,
  });
};
</script>
