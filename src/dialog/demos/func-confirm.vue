<template>
  <div :class="`${name}`">
    <t-cell-group title="函数调用: 反馈类弹框">
      <t-cell value-align="left">
        <t-button theme="primary" @click="changeFunctionVisible()"> 反馈类弹出框 </t-button>
      </t-cell>
    </t-cell-group>
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
    };
  },
  methods: {
    changeFunctionVisible() {
      Dialog.confirm({
        isInput: true,
        content: '我的家里有个人很酷',
        knowContent: 'i know',
        placeholderText: '请输入您的名字',
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
.dialog-base {
  .t-button:not(:last-child) {
    margin-right: 24px;
  }
}
</style>
