<template>
  <div class="demo-desc">文字按钮</div>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog4 = true"> 文字按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog4"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    :cancel-btn="cancelBtn"
    :confirm-btn="confirmBtn"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </t-dialog>
  <div class="btn-gap"></div>

  <div class="demo-desc">水平基础按钮</div>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog5 = true"> 水平基础按钮 </t-button>
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
  <div class="btn-gap"></div>

  <div class="demo-desc">垂直基础按钮</div>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog6 = true"> 垂直基础按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog6"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    cancel-btn="取消"
    confirm-btn="确认"
    button-layout="vertical"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </t-dialog>

  <div class="btn-gap"></div>

  <div class="demo-desc">多按钮</div>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog7 = true"> 多按钮 </t-button>
  <t-dialog
    v-model:visible="isShowDialog7"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    cancel-btn="取消"
    confirm-btn="确认"
    button-layout="vertical"
    :actions="actions"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
  </t-dialog>

  <div class="btn-gap"></div>

  <div class="demo-desc">带关闭按钮的对话框</div>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog8 = true">
    带关闭按钮的对话框
  </t-button>
  <t-dialog
    v-model:visible="isShowDialog8"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
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
  color: rgba(0, 0, 0, 0.6);
  margin-bottom: 16px;
}
</style>
