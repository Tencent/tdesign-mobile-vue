<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Fab 悬浮按钮</h1>
    <p class="summary">当功能使用图标即可表示清楚时，可使用纯图标悬浮按钮，例如：添加、发布。</p>
    <tdesign-demo-block title="01 类型" summary="纯图标悬浮按钮">
      <div class="toast-demo">
        <t-button block size="large" variant="outline" @click="changeType('base')">基础使用</t-button>
        <t-button block size="large" variant="outline" @click="changeType('advanced')">进阶使用</t-button>
      </div>
    </tdesign-demo-block>
    <BaseDemo v-if="type === 'base'" />
    <TextDemo v-if="type === 'advanced'" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseDemo from './display.vue';
import TextDemo from './text.vue';

const type = ref('base');
const changeType = (t: string) => (type.value = t);
</script>

<style lang="less" scoped></style>
