<template>
  <div class="tdesign-mobile-demo-block__summary tdesign-mobile-demo-block_subtitle demo-desc">文字按钮</div>
  <t-button block size="large" theme="primary" variant="outline" @click="isShowDialog4 = true"> 文字按钮</t-button>
  <t-dialog
    v-model:visible="isShowDialog4"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    content="告知当前状态、信息和解决方法"
    title="对话框标题"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
  </t-dialog>
  <div class="btn-gap"></div>

  <div class="tdesign-mobile-demo-block__summary tdesign-mobile-demo-block_subtitle demo-desc">水平基础按钮</div>
  <t-button block size="large" theme="primary" variant="outline" @click="isShowDialog5 = true"> 水平基础按钮</t-button>
  <t-dialog
    v-model:visible="isShowDialog5"
    cancel-btn="取消"
    confirm-btn="确认"
    content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
    title="对话框标题"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
  </t-dialog>
  <div class="btn-gap"></div>

  <div class="tdesign-mobile-demo-block__summary tdesign-mobile-demo-block_subtitle demo-desc">垂直基础按钮</div>
  <t-button block size="large" theme="primary" variant="outline" @click="isShowDialog6 = true"> 垂直基础按钮</t-button>
  <t-dialog
    v-model:visible="isShowDialog6"
    button-layout="vertical"
    cancel-btn="取消"
    confirm-btn="确认"
    content="告知当前状态、信息和解决方法"
    title="对话框标题"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
  </t-dialog>

  <div class="btn-gap"></div>

  <div class="tdesign-mobile-demo-block__summary tdesign-mobile-demo-block_subtitle demo-desc">多按钮</div>
  <t-button block size="large" theme="primary" variant="outline" @click="isShowDialog7 = true"> 多按钮</t-button>
  <t-dialog
    v-model:visible="isShowDialog7"
    :actions="actions"
    button-layout="vertical"
    cancel-btn="取消"
    confirm-btn="确认"
    content="告知当前状态、信息和解决方法"
    title="对话框标题"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
  </t-dialog>

  <div class="btn-gap"></div>

  <div class="tdesign-mobile-demo-block__summary tdesign-mobile-demo-block_subtitle demo-desc">带关闭按钮的对话框</div>
  <t-button block size="large" theme="primary" variant="outline" @click="isShowDialog8 = true">
    带关闭按钮的对话框
  </t-button>
  <t-dialog
    v-model:visible="isShowDialog8"
    button-layout="vertical"
    cancel-btn="取消"
    close-btn
    confirm-btn="确认"
    content="告知当前状态、信息和解决方法"
    title="对话框标题"
    @cancel="onCancel"
    @confirm="onConfirm"
  >
  </t-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const isShowDialog4 = ref(false);
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

const isShowDialog5 = ref(false);

const isShowDialog6 = ref(false);

const isShowDialog7 = ref(false);
const actions = [
  { content: '次要按钮', theme: 'light' },
  { content: '次要按钮', theme: 'light' },
  { content: '主要按钮', theme: 'primary' },
];

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

<style lang="less">
.demo-desc {
  font-size: 14px;
  margin-bottom: 16px;
}
</style>
