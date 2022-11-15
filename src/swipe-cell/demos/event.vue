<template>
  <tdesign-demo-block summary="点击事件">
    <t-swipe-cell :right="initData.btns" @click="handleClick">
      <t-cell title="左右都有内容" note="辅助信息"></t-cell>
      <template #left>
        <t-button @click="handleClickLeft">选择</t-button>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import Toast from '../../toast/index';
import { SwipeActionItem } from '../type';

const handleDelete = () => {
  Toast.success('删除成功');
};
const initData = reactive({
  btns: [
    // 通过按钮对象传入onClick事件，按钮的onClick事件优先级大于swipe-cell组件上绑定的onClick事件
    { text: '删除', theme: 'danger', onClick: handleDelete },
    { text: '收藏', theme: 'default' },
  ],
});
// 绑定在swipe-cell组件上面的onClick事件
const handleClick = (value: { action: SwipeActionItem; source: String }) => {
  // 根据返回的action对象判断点击的按钮
  Toast(JSON.stringify(value));
};
const handleClickLeft = () => {
  Toast('click');
};
</script>
