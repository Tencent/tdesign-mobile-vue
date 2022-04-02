<template>
  <tdesign-demo-block summary="左滑双操作">
    <t-swipe-cell :right="initData.btns" @click="(value) => handleClickBtns(value)">
      <t-cell title="列表-左滑双操作" note="双操作"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block style="margin-top: 10px">
    <t-swipe-cell :right="initData.btns" expanded="right" @click="(value) => handleClickBtns(value)">
      <t-cell title="列表-左滑双操作" note="双操作"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import Toast from '../../toast/index';
import { SwipeActionItem } from '../type';

interface InitData {
  btns: {}[];
}
export default defineComponent({
  setup() {
    const handleEdit = () => {
      Toast.success(`编辑成功`);
    };
    const handleClickBtns = (value: { action: SwipeActionItem; source: String }) => {
      Toast(JSON.stringify(value));
    };
    const initData: InitData = reactive({
      btns: [
        { text: '编辑', className: 't-button--primary', onClick: handleEdit },
        { text: '删除', className: 't-button--danger' },
      ],
    });
    return {
      initData,
      handleClickBtns,
    };
  },
});
</script>
