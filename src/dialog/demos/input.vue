<template>
  <t-button block size="large" theme="primary" variant="outline" @click="isShowDialog1 = true">输入类-无描述</t-button>
  <t-dialog
    v-model:visible="isShowDialog1"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    close-on-overlay-click
    title="对话框标题"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <t-input placeholder="请输入文字" />
  </t-dialog>

  <div class="btn-gap"></div>
  <t-button block size="large" theme="primary" variant="outline" @click="isShowDialog2 = true">输入类-带描述</t-button>
  <t-dialog
    v-model:visible="isShowDialog2"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    close-on-overlay-click
    title="对话框标题"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
    <p>告知当前状态、信息和解决方法等，描述文案尽可能控制在三行内</p>
    <t-input class="dialog-desc__input" placeholder="请输入文字" />
  </t-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isShowDialog1 = ref(false);
const isShowDialog2 = ref(false);

const confirmBtn = {
  content: '确认',
  variant: 'text',
  size: 'large',
};
const cancelBtn = {
  content: '取消',
  variant: 'text',
  size: 'large',
};

const onConfirm = () => {
  console.log('dialog:confirm');
};
const onCancel = () => {
  console.log('dialog:cancel');
};
</script>

<style lang="less" scoped>
.t-input {
  margin-top: 8px;
  --td-input-vertical-padding: 12px;
  --td-bg-color-container: var(--td-bg-color-page, #f3f3f3);
  border-radius: 6px;
}

.dialog-desc__input {
  margin-top: 16px;
}
</style>
