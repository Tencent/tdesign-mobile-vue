<template>
  <tdesign-demo-block summary="左滑单操作">
    <t-swipe-cell>
      <t-cell title="列表-左滑单操作" note="辅助信息"></t-cell>
      <template #right>
        <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block style="margin-top: 10px">
    <t-swipe-cell expanded="right">
      <t-cell title="列表-左滑单操作" note="辅助信息"></t-cell>
      <template #right>
        <t-button theme="danger" shape="square" @click="handleClick">删除</t-button>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import Toast from '../../toast/index';

const handleClick = () => {
  Toast('click');
};
</script>
