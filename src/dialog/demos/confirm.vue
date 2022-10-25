<template>
  <t-button block variant="outline" size="large" @click="isShowDialog5 = true"> 双按钮 </t-button>
  <t-button block variant="outline" size="large" @click="isShowDialog6 = true"> 带警示按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog5"
    type="confirm"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    placeholder-text="输入框提示文字"
    cancel-btn="取消"
    confirm-btn="确认"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </t-dialog>
  <t-dialog
    v-model:visible="isShowDialog6"
    type="confirm"
    title="对话框标题"
    content="告知当前状态、信息和解决方法，等内容。描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很告知当前状态、信息和解决方法，等内容。描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很"
    cancel-btn="取消"
    :confirm-btn="{ content: '警示操作', theme: 'danger' }"
    @confirm="onConfirm"
    @cancel="onCancel"
    @close="onClose"
  >
  </t-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const isShowDialog5 = ref(false);
const isShowDialog6 = ref(false);

const onConfirm = () => {
  console.log('dialog:confirm');
};

const onCancel = () => {
  console.log('dialog: cancel');
};

const onClose = () => {
  console.log('dialog: close');
};
</script>

<style lang="less" scoped>
.tdesign-demo--dialog {
  .t-button:not(:last-child) {
    margin-right: 20px;
  }
}
</style>
