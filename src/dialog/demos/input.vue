<template>
  <t-button block variant="outline" size="large" @click="isShowDialog1 = true"> 单行标题对话框 </t-button>
  <t-button block variant="outline" size="large" @click="isShowDialog2 = true"> 带说明文本对话框 </t-button>
  <t-dialog
    v-model:visible="isShowDialog1"
    close-on-overlay-click
    title="最小高度样式，文案上下居中"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  >
    <template #footer-confirm>
      <div>我同意</div>
    </template>
    <template #footer-cancel>
      <div>我不同意</div>
    </template>
  </t-dialog>
  <t-dialog
    v-model:visible="isShowDialog2"
    close-on-overlay-click
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    button-layout="vertical"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  >
    <template #other-content>
      <t-input type="text" placeholder="输入文案" />
    </template>
    <template #footer-confirm>
      <div>我同意</div>
    </template>
    <template #footer-cancel>
      <div>我不同意</div>
    </template>
  </t-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const isShowDialog1 = ref(false);
const isShowDialog2 = ref(false);

const onConfirm = () => {
  console.log('dialog:confirm');
};
const onCancel = () => {
  console.log('dialog:cancel');
};
const onChange = () => {
  console.log('dialog:change');
};
</script>

<style lang="less" scoped>
.tdesign-demo--dialog {
  .t-button:not(:last-child) {
    margin-right: 20px;
  }
}
</style>
