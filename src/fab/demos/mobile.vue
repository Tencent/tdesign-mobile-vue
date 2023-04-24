<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Fab 悬浮按钮</h1>
    <p class="summary">当功能使用图标即可表示清楚时，可使用纯图标悬浮按钮，例如：添加、发布。</p>
    <tdesign-demo-block title="01 组件类型" summary="纯图标悬浮按钮" :padding="true">
      <t-button v-bind="btnProps" @click="changeType('base')">纯图标悬浮按钮</t-button>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标加文字悬浮按钮" :padding="true">
      <t-button v-bind="btnProps" @click="changeType('advance')">图标加文字悬浮按钮</t-button>
    </tdesign-demo-block>
    <BaseDemo v-if="type === 'base'" />
    <AdvanceDemo v-if="type === 'advance'" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseDemo from './base.vue';
import AdvanceDemo from './advance.vue';

const type = ref('base');
const changeType = (t: string) => (type.value = t);
const btnProps = {
  block: true,
  size: 'large',
  theme: 'primary',
  variant: 'outline',
};
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: #fff;
  min-height: 100vh;
  box-sizing: border-box;
}
</style>
