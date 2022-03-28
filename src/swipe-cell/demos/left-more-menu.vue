<template>
  <tdesign-demo-block summary="左滑多操作">
    <t-swipe-cell>
      <t-cell title="列表-左滑多操作" note="多操作"></t-cell>
      <template #right>
        <t-button theme="primary" shape="square" @click="handleClick">收藏</t-button>
        <t-button theme="warning" shape="square" @click="handleClick">编辑</t-button>
        <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block style="margin-top: 10px">
    <t-swipe-cell expanded="right">
      <t-cell title="列表-左滑多操作" note="多操作"></t-cell>
      <template #right>
        <t-button theme="primary" shape="square" @click="handleClick">收藏</t-button>
        <t-button theme="warning" shape="square" @click="handleClick">编辑</t-button>
        <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Toast from '../../toast/index';
import { SwipeActionItem } from '../type';

export default defineComponent({
  setup() {
    const handleClick = () => {
      Toast('click');
    };
    return {
      handleClick,
    };
  },
});
</script>
