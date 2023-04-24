<template>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog5 = true">确认类-带标题</t-button>
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

  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog6 = true">确认类-无标题</t-button>

  <t-dialog
    v-model:visible="isShowDialog6"
    close-on-overlay-click
    content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
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
