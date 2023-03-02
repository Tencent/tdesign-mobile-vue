<template>
  <tdesign-demo-block summary="左右两侧都有菜单">
    <t-swipe-cell>
      <t-cell title="左右都有菜单"></t-cell>
      <template #left>
        <t-button theme="primary" @click="handleClickLeft">选择</t-button>
      </template>
      <template #right>
        <t-button theme="default" @click="handleClick">收藏</t-button>
        <t-button theme="danger" @click="handleClick">删除</t-button>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import Toast from '../../toast/index';
import { SwipeActionItem } from '../type';

const handleClick = (value: { action: SwipeActionItem; source: String }) => {
  Toast(JSON.stringify(value));
};
const handleClickLeft = () => {
  Toast('click');
};
</script>
