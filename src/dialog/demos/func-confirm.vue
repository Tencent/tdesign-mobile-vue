<template>
  <div :class="`${name}`">
    <t-cell value-align="left">
      <t-button theme="primary" size="large" @click="changeFunctionVisible">
        确认类弹出框
      </t-button>
    </t-cell>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';

import Dialog from '../index';
import config from '@/config';

const { prefix } = config;
const name = `${prefix}-demo--dialog`;

export default defineComponent({
  setup() {
    return {
      name: ref(name),
    };
  },
  data() {
    return {
      header: '标题',
      content: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      placeholderText: '输入框提示文字',
      cancelButtonText: '我再想想',
      confirmButtonText: '继续',
      zIndex: 3000,
      width: 250,
      showHeader: false,
      showFooter: false,
      showOverlay: false,
      isInput: true,
      isShowDialog: false,
    };
  },
  methods: {
    changeFunctionVisible() {
      Dialog.alert({
        showHeader: false,
        content: '我的家里有个人很酷',
        knowContent: 'i know',
        onConfirm: (e: string) => {
          console.log('dialog:confirm', e);
        },
        onCancel: () => {
          console.log('dialog:cancel');
        },
        onClickOverlay: () => {
          console.log('dialog:clickOverlay');
        },
      });
    },
  },
});
</script>

<style lang="less" scoped>
.tdesign-demo--dialog {
  padding-bottom: 20px;
  text-align: center;
  padding-top: 20px;
  .dialog-type-title{
    margin: 20px 0px;
    color: #333;
    font-size: 22px;
  }
  .block + .block {
    margin-top: 12px;
    .block--title {
      margin-top: 12px;
    }
  }
  .block--title {
    padding: 20px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
