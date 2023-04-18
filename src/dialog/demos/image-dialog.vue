<template>
  <t-button block variant="outline" size="large" @click="isShowDialog5 = true">图片置顶</t-button>
  <t-dialog
    v-model:visible="isShowDialog5"
    type="confirm"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    placeholder-text="输入框提示文字"
    cancel-btn="取消"
    confirm-btn="确认"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template #top>
      <t-image fit="contain" :src="imageSrc"></t-image>
    </template>
  </t-dialog>
  <div class="btn-gap"></div>
  <t-button block variant="outline" size="large" @click="isShowDialog7 = true">图片居中</t-button>
  <t-dialog
    v-model:visible="isShowDialog7"
    type="confirm"
    title="对话框标题"
    content="告知当前状态、信息和解决方法"
    placeholder-text="输入框提示文字"
    cancel-btn="取消"
    confirm-btn="确认"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template #middle>
      <t-image class="image" fit="contain" :src="imageSrc"></t-image>
    </template>
  </t-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const isShowDialog5 = ref(false);
const isShowDialog7 = ref(false);

const imageSrc = ref('https://tdesign.gtimg.com/miniprogram/images/dialog1.png');

const onConfirm = () => {
  console.log('dialog:confirm');
};

const onCancel = () => {
  console.log('dialog: cancel');
};
</script>
<style scoped lang="less">
.image {
  margin-top: 24px;
}
</style>
