<template>
  <div ref="container" class="tdesign-mobile-demo">
    <h1 class="title">BackTop 回到顶部</h1>
    <p class="summary">当页面过长往下滑动是会出现返回顶部的便捷操作，帮助用户快速回到页面顶部</p>
    <tdesign-demo-block title="组件类型" summary="圆形返回顶部">
      <BaseDemo v-model:text="text" v-model:theme="theme" :container="() => container?.parentElement" />
    </tdesign-demo-block>
    <tdesign-demo-block title="" summary="半圆形返回顶部">
      <HalfRoundDemo v-model:text="text" v-model:theme="theme" :container="() => container?.parentElement" />
    </tdesign-demo-block>
    <t-back-top :theme="theme" :text="text" :on-to-top="handleToTop" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseDemo from './base.vue';
import HalfRoundDemo from './half-round.vue';

const container = ref<HTMLElement>();
const theme = ref('round');
const text = ref('顶部');
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
