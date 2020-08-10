<template>
  <div :class="`${name}`">
    <t-cell-group title="方式二：函数调用">
      <t-cell-group class="dialog-type-title" title="反馈类弹框">
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeFunctionVisible">
            含标题含底部
          </t-button>
        </t-cell>
      </t-cell-group>
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';

import Dialog from '../index.func';
import config from '@/config';

const { prefix } = config;
const name = `${prefix}-demo--dialog`;

export default {
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
            onConfirm: (e:any) => {
              console.log('dialog:confirm', e);
            },
            onCancel: () => {
              console.log('dialog:cancel');
            },
            onClickoverlay: () => {
              console.log('dialog:clickoverlay');
            },
        });
    },
  },
};
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
