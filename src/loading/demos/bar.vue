<template>
  <t-loading theme="bar" :progress="progress" />
  <t-button variant="outline" @click.stop="onShowLoadingBar">{{
    progress > 0 && progress < 1 ? '页面加载中...' : '页面进度条加载'
  }}</t-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const progress = ref(0);
let timer: any;

const onShowLoadingBar = () => {
  if (timer) {
    return;
  }
  progress.value = 0;
  timer = setInterval(() => {
    if (progress.value >= 1) {
      clearInterval(timer);
      timer = null;

      setTimeout(() => {
        progress.value = 0;
      }, 2000);
      return;
    }
    progress.value += 0.01;
  }, 100);
};
</script>
