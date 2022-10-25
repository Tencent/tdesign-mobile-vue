<template>
  <t-button block variant="outline" size="large" @click="isShowDialog1 = true"> 单行标题 </t-button>
  <t-button block variant="outline" size="large" @click="isShowDialog2 = true"> 多行标题最大高度 </t-button>
  <t-button block variant="outline" size="large" @click="isShowDialog3 = true"> 带说明文本 </t-button>
  <t-button block variant="outline" size="large" @click="isShowDialog4 = true"> 带说明文本最大高度 </t-button>
  <!-- <t-button block variant="outline" size="large" @click="eventDialog()"> 函数调用长文本对话框 </t-button> -->
  <t-dialog
    v-model:visible="isShowDialog1"
    :title="singleHeader"
    confirm-btn="知道了"
    :close-on-overlay-click="false"
    :show-overlay="showOverlay"
  >
  </t-dialog>
  <t-dialog v-model:visible="isShowDialog2" :title="moreTextHeader" confirm-btn="知道了"> </t-dialog>
  <t-dialog
    v-model:visible="isShowDialog3"
    :title="title"
    content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
    confirm-btn="知道了"
    @confirm="onConfirm"
    @overlay-click="onClickOverlay"
  >
  </t-dialog>
  <t-dialog v-model:visible="isShowDialog4" :title="title" :content="moreTextContent" confirm-btn="知道了"></t-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const title = '对话框标题';
const moreTextHeader = '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内';
const singleHeader = '最小高度样式，文案上下居中';
const moreTextContent = '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内';
const showOverlay = false;
const isShowDialog1 = ref(false);
const isShowDialog2 = ref(false);
const isShowDialog3 = ref(false);
const isShowDialog4 = ref(false);

const onConfirm = (e: string) => {
  console.log('dialog:confirm', e);
};

const onClickOverlay = () => {
  console.log('dialog:clickOverlay');
};
</script>

<style lang="less">
.dialog-base {
  .t-button:not(:last-child) {
    margin-right: 24px;
  }
}
</style>
