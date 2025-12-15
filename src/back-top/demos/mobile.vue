<template>
  <div ref="container" class="tdesign-mobile-demo">
    <h1 class="title">BackTop 返回顶部</h1>
    <p class="summary">用于当页面过长往下滑动时，帮助用户快速回到页面顶部。</p>
    <tdesign-demo-block summary="圆形返回顶部" title="组件类型">
      <BaseDemo v-model:text="text" v-model:theme="theme" :container="() => container?.parentElement" />
    </tdesign-demo-block>
    <tdesign-demo-block summary="半圆形返回顶部" title="">
      <HalfRoundDemo v-model:text="text" v-model:theme="theme" :container="() => container?.parentElement" />
    </tdesign-demo-block>
    <t-back-top :text="text" :theme="theme" />
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
