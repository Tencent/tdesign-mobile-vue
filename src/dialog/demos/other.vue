<template>
  <t-button block variant="outline" size="large" @click="isShowDialog4 = true"> 双按钮 </t-button>
  <t-button block variant="outline" size="large" @click="isShowDialog5 = true"> 垂直多按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog4"
    type="confirm"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    placeholder-text="输入框提示文字"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </t-dialog>
  <t-dialog
    v-model:visible="isShowDialog5"
    type="confirm"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    placeholder-text="输入框提示文字"
    cancel-btn="取消"
    confirm-btn="确认"
    button-layout="vertical"
    :actions="actions"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template #top>
      <t-image class="image-container" fit="contain" :src="imageSrc"></t-image>
    </template>
  </t-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const isShowDialog4 = ref(false);
const confirmBtn = {
  content: '确认',
  variant: 'text',
};
const cancelBtn = {
  content: '取消',
  variant: 'text',
};

const isShowDialog5 = ref(false);
const imageSrc = ref('https://tdesign.gtimg.com/miniprogram/images/dialog1.png');

const actions = ['按钮1', '按钮2', '按钮3'];

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
