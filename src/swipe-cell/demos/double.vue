<template>
  <tdesign-demo-block summary="左右滑操作">
    <t-swipe-cell :opened="[true, false]">
      <t-cell title="左右滑操作" note="辅助信息"></t-cell>
      <template #left>
        <div class="btn favor-btn" @click="handleClickLeft">选择</div>
      </template>
      <template #right>
        <div class="btn favor-btn" @click="handleClick('favor')">收藏</div>
        <div class="btn delete-btn" @click="handleClick('delete')">删除</div>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';

const handleClick = (value: string) => {
  Toast(value);
};
const handleClickLeft = () => {
  Toast('click');
};
</script>
