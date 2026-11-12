<template>
  <tdesign-demo-block summary="滑动到底自动执行操作">
    <t-swipe-cell full-swipe opened :right="actions">
      <t-cell title="左滑到底删除" note="辅助信息"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';
import type { SwipeActionItem } from 'tdesign-mobile-vue';

const actions: SwipeActionItem[] = [
  { text: '删除', className: 'btn delete-btn', onClick: () => Toast.success('删除成功') },
];
</script>
