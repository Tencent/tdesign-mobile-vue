<template>
  <tdesign-demo-block title="组件类型" summary="左滑动操作">
    <t-swipe-cell ref="cell1" opened>
      <t-cell title="左滑单操作" note="辅助信息"></t-cell>
      <template #right>
        <div class="btn delete-btn" @click="handleClick">删除</div>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block style="margin-top: 10px">
    <t-swipe-cell ref="cell2" opened>
      <t-cell title="左滑单操作" note="辅助信息" description="一段很长很长的内容文字"></t-cell>
      <template #right>
        <div class="btn delete-btn" @click="handleClick">删除</div>
      </template>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block style="margin-top: 10px">
    <t-swipe-cell opened :right="initData.btns.slice(1)" @click="(value: any) => handleClickBtns(value)">
      <t-cell title="左滑双操作" note="辅助信息"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block style="margin-top: 10px">
    <t-swipe-cell :right="initData.btns" opened @click="(value: any) => handleClickBtns(value)">
      <t-cell title="左滑三操作" note="辅助信息"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { SwipeActionItem, Toast } from 'tdesign-mobile-vue';

interface InitData {
  btns: {}[];
}
const handleCollect = () => {
  Toast.success(`收藏成功`);
};
const handleEdit = () => {
  Toast.success(`编辑成功`);
};

const handleDelete = () => {
  Toast.success(`删除成功`);
};

const handleClickBtns = (value: { action: SwipeActionItem; source: String }) => {
  Toast(JSON.stringify(value));
};

const initData: InitData = reactive({
  btns: [
    { text: '收藏', className: 'btn favor-btn', onClick: handleCollect },
    { text: '编辑', className: 'btn edit-btn', onClick: handleEdit },
    { text: '删除', className: 'btn delete-btn', onClick: handleDelete },
  ],
});
const handleClick = (e: Event) => {
  Toast('click');
};
</script>

<style lang="less">
.btn-wrapper {
  height: 100%;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  color: white;
  font-size: 14px;
}

.delete-btn {
  background-color: #e34d59;
}

.edit-btn {
  background-color: #ed7b2f;
}

.favor-btn {
  background-color: #0052d9;
}
</style>
