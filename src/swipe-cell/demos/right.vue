<template>
  <tdesign-demo-block summary="右滑动操作">
    <t-swipe-cell opened>
      <t-cell title="右滑单操作" note="辅助信息"></t-cell>
      <template #left>
        <div class="btn favor-btn" @click="handleClick">选择</div>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { Toast } from 'tdesign-mobile-vue';

const handleClick = () => {
  Toast('click');
};
</script>
