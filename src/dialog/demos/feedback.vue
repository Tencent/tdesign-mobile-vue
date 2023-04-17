<template>
  <t-button block variant="outline" size="large" @click="isShowDialog1 = true"> 反馈类-基础 </t-button>
  <t-dialog
    v-model:visible="isShowDialog1"
    title="对话框标题"
    content="告知当前状态、信息等内容。描述文案尽可能控制在三行内"
    confirm-btn="知道了"
    :close-on-overlay-click="false"
    :show-overlay="showOverlay"
  >
  </t-dialog>
  <div class="btn-gap"></div>
  <t-button block variant="outline" size="large" @click="isShowDialog2 = true"> 反馈类-无标题 </t-button>
  <t-dialog
    v-model:visible="isShowDialog2"
    content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
    confirm-btn="知道了"
    :close-on-overlay-click="false"
    :show-overlay="showOverlay"
  >
  </t-dialog>
  <div class="btn-gap"></div>
  <t-button block variant="outline" size="large" @click="isShowDialog3 = true"> 反馈类-内容超长 </t-button>
  <t-dialog
    v-model:visible="isShowDialog3"
    title="对话框标题"
    confirm-btn="知道了"
    @confirm="onConfirm"
    @overlay-click="onClickOverlay"
  >
    <template #middle>
      <div class="middle-container">
        {{ content }}
      </div>
    </template>
  </t-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const showOverlay = false;
const isShowDialog1 = ref(false);
const isShowDialog2 = ref(false);
const isShowDialog3 = ref(false);
const content =
  '这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案.这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案.这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案.这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案.这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案，这里是辅助内容文案.';

const onConfirm = (e: string) => {
  console.log('dialog:confirm', e);
};

const onClickOverlay = () => {
  console.log('dialog:clickOverlay');
};
</script>

<style lang="less">
.dialog-demo {
  .btn-gap {
    width: 100%;
    height: 16px;
  }
  .middle-container {
    padding: 20px;
    overflow: auto;
    max-height: 100px;
  }
}
</style>
