<template>
  <div class="toast-demo">
    <div class="toast-demo">
      <t-button block size="large" variant="outline" @click="showOverlayProps">可滑动和点击透明遮罩</t-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';

const showOverlayProps = () => {
  Toast({
    theme: 'loading',
    message: '加载中...',
    showOverlay: true,
    overlayProps: { transparent: true, visible: true },
    preventScrollThrough: false,
  });
};
</script>
