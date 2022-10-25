<template>
  <div class="tdesign-demo-block">
    <t-button block size="large" variant="outline" @click="showPreventScrollThrough">禁止滑动和点击</t-button>
    <t-button block size="large" variant="outline" @click="showOverlay">显示提示</t-button>
    <t-button block size="large" variant="outline" @click="hideToast">关闭提示</t-button>
    <t-button block size="large" variant="outline" @click="showOverlayProps">可滑动和点击透明遮罩</t-button>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { Toast } from 'tdesign-mobile-vue';
import { PoweroffIcon } from 'tdesign-icons-vue-next';

const showOverlay = () => {
  Toast({ message: '未知点击事件' });
};
const hideToast = () => {
  Toast.clear();
};

const showPreventScrollThrough = () => {
  Toast({
    message: '禁止滑动和点击',
    direction: 'column',
    placement: 'bottom',
    duration: 5000,
    preventScrollThrough: true,
    icon: () => h(PoweroffIcon),
  });
};
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
