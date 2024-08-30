<template>
  <tdesign-demo-block summary="带图标的滑动操作">
    <t-swipe-cell :right="initData.btns0" opened>
      <t-cell title="图标加文字横排" note="辅助信息"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block>
    <t-swipe-cell :right="initData.btns1" opened>
      <t-cell title="纯图标" note="辅助信息"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
  <tdesign-demo-block>
    <t-swipe-cell :right="initData.btns2" opened>
      <t-cell title="图标加文字竖排" note="辅助信息" description="一段很长很长的内容文字"></t-cell>
    </t-swipe-cell>
  </tdesign-demo-block>
</template>

<script setup lang="ts">
import { reactive, h } from 'vue';
import { Edit1Icon, DeleteIcon } from 'tdesign-icons-vue-next';
import { Toast } from 'tdesign-mobile-vue';

interface InitData {
  btns0: {}[];
  btns1: {}[];
  btns2: {}[];
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

const handleClick = (value: string) => {
  Toast(value);
};
const handleClickLeft = () => {
  Toast('click');
};
const editIcon = h(Edit1Icon, { size: '16px' });
const delIcon = h(DeleteIcon, { size: '16px' });

const initData: InitData = reactive({
  btns0: [
    { text: '编辑', icon: editIcon, className: 'btn edit-btn', onClick: handleEdit },
    { text: '删除', icon: delIcon, className: 'btn delete-btn', onClick: handleDelete },
  ],
  btns1: [
    { icon: h(Edit1Icon), className: 'btn edit-btn', onClick: handleEdit },
    { icon: h(DeleteIcon), className: 'btn delete-btn', onClick: handleDelete },
  ],
  btns2: [
    { text: '编辑', icon: editIcon, className: 'btn edit-btn vertical', onClick: handleEdit },
    { text: '删除', icon: delIcon, className: 'btn delete-btn vertical', onClick: handleDelete },
  ],
});
</script>

<style lang="less">
.vertical {
  // display: flex;
  flex-direction: column;
  .t-swipe-cell {
    &__text:not(:empty) {
      margin-top: 4px;
      margin-left: 0;
    }
  }
}
</style>
