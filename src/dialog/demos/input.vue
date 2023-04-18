<template>
  <t-button block variant="outline" size="large" @click="isShowDialog1 = true"> 输入类-无描述 </t-button>
  <t-dialog
    v-model:visible="isShowDialog1"
    close-on-overlay-click
    title="对话框标题"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  >
    <template #middle>
      <div class="input">
        <t-input placeholder="请输入文字" />
      </div>
    </template>
  </t-dialog>

  <div class="btn-gap"></div>
  <t-button block variant="outline" size="large" @click="isShowDialog2 = true"> 输入类-带描述 </t-button>
  <t-dialog
    v-model:visible="isShowDialog2"
    close-on-overlay-click
    title="对话框标题"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    content="告知当前状态、信息和解决方法"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  >
    <template #middle>
      <div class="input input__slot">
        <t-input placeholder="请输入文字" />
      </div>
    </template>
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
const onChange = () => {
  console.log('dialog:change');
};
</script>
<style lang="less" scoped>
.input {
  margin: 0 16px;
  --td-input-vertical-padding: 12px;
  --td-bg-color-container: #f3f3f3;
}

.input__slot {
  margin: 16px 16px 0;
}
</style>
