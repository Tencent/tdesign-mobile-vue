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
    <tdesign-demo-block title="02 组件样式" summary="可移动悬浮按钮" :padding="true">
      <t-button v-bind="btnProps" @click="changeType('draggable')">可移动悬浮按钮</t-button>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带自动收缩功能" :padding="true">
      <t-button v-bind="btnProps" @click="changeType('collapsible')">带自动收缩功能</t-button>
    </tdesign-demo-block>
    <tdesign-demo-block :padding="true">
      <div v-for="item of Array(2)" :key="item" class="group">
        <t-skeleton :row-col="rowCols" :loading="true"></t-skeleton>
        <t-skeleton :row-col="rowCols" :loading="true"></t-skeleton>
      </div>
    </tdesign-demo-block>
    <BaseDemo v-if="type === 'base'" />
    <AdvanceDemo v-if="type === 'advance'" />
    <DraggableDemo v-if="type === 'draggable'" />
    <CollapsibleDemo v-if="type === 'collapsible'" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseDemo from './base.vue';
import AdvanceDemo from './advance.vue';
import DraggableDemo from './draggable.vue';
import CollapsibleDemo from './collapsible.vue';

const type = ref('base');
const changeType = (t: string) => (type.value = t);
const btnProps = {
  block: true,
  size: 'large',
  theme: 'primary',
  variant: 'outline',
};
const rowCols = [{ size: '163.5px', borderRadius: '12px' }, 1, { width: '61%' }];
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: #fff;
  min-height: 100%;
  box-sizing: border-box;
}

.group {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
</style>
