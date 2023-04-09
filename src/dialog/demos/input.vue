<template>
  <t-button block variant="outline" size="large" @click="isShowDialog1 = true"> 输入类-无描述 </t-button>
  <t-dialog
    v-model:visible="isShowDialog1"
    close-on-overlay-click
    title="对话框标题"
    cancel-btn="取消"
    confirm-btn="确认"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  >
    <template #middle>
      <div class="input-container">
        <t-input placeholder="请输入文字" />
      </div>
    </template>
  </t-dialog>

  <br />
  <t-button block variant="outline" size="large" @click="isShowDialog2 = true"> 输入类-带描述 </t-button>
  <t-dialog
    v-model:visible="isShowDialog2"
    close-on-overlay-click
    title="对话框标题"
    cancel-btn="取消"
    confirm-btn="确认"
    content="告知当前状态、信息和解决方法"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  >
    <template #middle>
      <div class="input-container">
        <t-input placeholder="请输入文字" />
      </div>
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
.dialog-demo {
  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 28px;
  }
}
</style>
