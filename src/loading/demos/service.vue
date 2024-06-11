<template>
  <div class="loading-demo">
    <div id="loading-service-demo" ref="content" class="loading-service-demo">Loading 挂载容器</div>
    <div class="space">
      <t-button class="t-loading__btn" size="small" :disabled="attachLoading" @click="showAttach">
        函数方式加载（局部）
      </t-button>
      <t-button size="small" @click="showFullScreen">函数方式加载（全屏）</t-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { LoadingPlugin } from '../plugin';
import TButton from '../../button';

const content = ref(null);
const attachLoading = ref(false);

// 函数式：局部加载
const showAttach = () => {
  const loadingAttachInstance = LoadingPlugin({
    attach: () => content.value, // 等于 attach: '#loading-service-demo'
    size: '20px',
  });
  attachLoading.value = true;
  const timer = setTimeout(() => {
    loadingAttachInstance.hide();
    attachLoading.value = false;
    clearTimeout(timer);
  }, 1000);
};

// 函数式：全屏加载，防止滚动穿透
const showFullScreen = () => {
  LoadingPlugin(true);
  const timer = setTimeout(() => {
    LoadingPlugin(false);
    clearTimeout(timer);
  }, 1000);
};
</script>

<style scoped>
.loading-demo {
  padding: 0 16px;
}
.space {
  display: flex;
  margin-top: 8px;
  gap: 6px;
}
.loading-service-demo {
  position: relative;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px var(--component-border, #eee) solid;
}
</style>
