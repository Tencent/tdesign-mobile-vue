<template>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog1 = true"> 反馈类-基础 </t-button>
  <t-dialog
    v-model:visible="isShowDialog1"
    title="对话框标题"
    content="告知当前状态、信息等内容。描述文案尽可能控制在三行内"
    confirm-btn="知道了"
    :close-on-overlay-click="false"
  >
  </t-dialog>
  <div class="btn-gap"></div>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog2 = true">
    反馈类-无标题
  </t-button>
  <t-dialog
    v-model:visible="isShowDialog2"
    content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
    confirm-btn="知道了"
    :close-on-overlay-click="false"
  >
  </t-dialog>
  <div class="btn-gap"></div>
  <t-button block variant="outline" theme="primary" size="large" @click="isShowDialog3 = true">
    反馈类-内容超长
  </t-button>
  <t-dialog
    v-model:visible="isShowDialog3"
    title="对话框标题"
    confirm-btn="知道了"
    @confirm="onConfirm"
    @overlay-click="onClickOverlay"
  >
    <div class="content-container">
      {{ content }}
    </div>
  </t-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isShowDialog1 = ref(false);
const isShowDialog2 = ref(false);
const isShowDialog3 = ref(false);
const content =
  '这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案';

const onConfirm = (e: string) => {
  console.log('dialog:confirm', e);
};

const onClickOverlay = () => {
  console.log('dialog:clickOverlay');
};
</script>

<style lang="less">
.content-container {
  height: 264px;
  overflow-y: auto;
  font-size: 16px;
  color: var(--td-font-gray-2);
  line-height: 24px;
  white-space: pre-line;

  &::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
}
</style>
