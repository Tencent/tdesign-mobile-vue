<template>
  <div>
    <div class="button-group">
      <t-button block size="large" variant="outline" @click="onBtnClick('round', '顶部')">圆角白底</t-button>
      <t-button block size="large" variant="outline" @click="onBtnClick('round-dark', '顶部')">圆角黑底</t-button>
      <t-button block size="large" variant="outline" @click="onBtnClick('round', '')">圆白底纯图标</t-button>
      <t-button block size="large" variant="outline" @click="onBtnClick('round-dark', '')">圆黑底纯图标</t-button>
    </div>
    <p class="tdesign-mobile-demo-block__summary">半圆型返回顶部</p>
    <div class="button-group">
      <t-button block size="large" variant="outline" @click="onBtnClick1('half-round')">半圆白底</t-button>
      <t-button block size="large" variant="outline" @click="onBtnClick1('half-round-dark')">半圆黑底</t-button>
    </div>

    <t-back-top v-show="showBackTop" :theme="theme" :text="text" />
    <t-back-top v-show="showBackTop1" :theme="theme" text="返回顶部" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const theme = ref('round');
const text = ref('顶部');
const showBackTop = ref(false);
const showBackTop1 = ref(false);

const onBtnClick = (tem: string, txt: string) => {
  text.value = txt;
  theme.value = tem;
  showBackTop.value = true;
  showBackTop1.value = false;
  window.scrollTo(0, 1200);
};

const onBtnClick1 = (tem: string) => {
  theme.value = tem;
  showBackTop.value = false;
  showBackTop1.value = true;
  window.scrollTo(0, 1200);
};
</script>

<style lang="less" scoped>
.button-group {
  padding: 8px 16px 16px;
  .t-button {
    margin-bottom: 10px;
  }
}
</style>
