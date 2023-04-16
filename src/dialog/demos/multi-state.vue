<template>
  <t-button block variant="outline" size="large" @click="isShowDialog4 = true"> 文字按钮 </t-button>
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
  <br />

  <t-button block variant="outline" size="large" @click="isShowDialog5 = true"> 水平基础按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog5"
    title="对话框标题"
    content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
    cancel-btn="取消"
    confirm-btn="确认"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </t-dialog>
  <br />
  <t-button block variant="outline" size="large" @click="isShowDialog6 = true"> 垂直基础按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog6"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    placeholder-text="输入框提示文字"
    cancel-btn="取消"
    confirm-btn="确认"
    button-layout="vertical"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </t-dialog>

  <br />
  <t-button block variant="outline" size="large" @click="isShowDialog7 = true"> 垂直多按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog7"
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
  </t-dialog>

  <br />
  <t-button block variant="outline" size="large" @click="isShowDialog8 = true"> 带关闭按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog8"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    placeholder-text="输入框提示文字"
    close-btn
    cancel-btn="取消"
    confirm-btn="确认"
    button-layout="vertical"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
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

const isShowDialog6 = ref(false);

const isShowDialog7 = ref(false);
const actions = [{ content: '次要按钮' }, { content: '次要按钮' }, { content: '主要按钮', theme: 'primary' }];

const isShowDialog8 = ref(false);
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
