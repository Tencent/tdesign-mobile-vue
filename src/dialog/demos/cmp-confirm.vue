<template>
  <div :class="`${name}`">
    <t-cell-group title="方式一：组件调用">
      <t-cell-group class="dialog-type-title" title="反馈类弹框">
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="this.isShowDialog = true">
            含默认header/footer/宽度/层级,事件调用
          </t-button>
          <t-dialog
            :content="content"
            @clickoverlay="clickoverlay"
            @confirm="onConfirm"
            @opened="openDialog"
            @closed="closeDialog"
            @visible-change="changeVisible"
            v-model="isShowDialog"></t-dialog>
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
    onConfirm(e:any)  {
      console.log('dialog:confirm', e);
    },

    openDialog() {
      console.log('dialog:opened');
    },

    closeDialog() {
      console.log('dialog:closed');
    },

    changeVisible(e:any) {
      console.log('dialog:visible-change', e);
    },

    clickoverlay() {
      console.log('dialog:clickoverlay');
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
