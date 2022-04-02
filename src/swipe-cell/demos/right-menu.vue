<template>
  <tdesign-demo-block summary="右滑单操作">
    <t-swipe-cell>
      <t-cell title="列表-右滑单操作" note="辅助信息"></t-cell>
      <template #left>
        <t-button theme="primary" shape="square" @click="handleClick">选择</t-button>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block style="margin-top: 10px">
    <t-swipe-cell expanded="left">
      <t-cell title="列表-右滑单操作" note="辅助信息"></t-cell>
      <template #left>
        <t-button theme="primary" shape="square" @click="handleClick">选择</t-button>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from '../../toast/index';

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
