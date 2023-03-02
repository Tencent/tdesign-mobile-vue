<template>
  <div class="toast-demo">
    <t-button block size="large" variant="outline" @click="showOverlay">显示提示</t-button>
    <t-button block size="large" variant="outline" @click="hideToast">关闭提示</t-button>
  </div>
</template>

<script setup lang="ts">
import Toast from '../index';

const showOverlay = () => {
  Toast({ message: '未知点击事件' });
};
const hideToast = () => {
  Toast.clear();
};
</script>
