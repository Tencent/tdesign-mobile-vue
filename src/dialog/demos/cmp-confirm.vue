<template>
  <div :class="`${name}`">
    <t-cell-group title="组件调用: 确认类弹框——默认">
      <t-cell value-align="left">
        <t-button theme="primary" @click="changeDialogVisible(1)"> 默认用法 </t-button>
        <t-dialog
          v-model="isShowDialog1"
          type="confirm"
          :title="title"
          :content="content"
          :placeholder-text="placeholderText"
          :cancel-button-text="cancelButtonText"
          :confirm-button-text="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
        </t-dialog>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="组件调用: 确认类弹框——input用法">
      <t-cell value-align="left">
        <t-button theme="primary" @click="changeDialogVisible(2)"> input用法 </t-button>
        <t-dialog
          v-model="isShowDialog2"
          type="confirm"
          :is-input="isInput"
          :title="title"
          :content="content"
          :placeholder-text="placeholderText"
          :cancel-button-text="cancelButtonText"
          :confirm-button-text="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <template #footer-cancel>
            <div style="color: grey; font-size: 18px">我不同意</div>
          </template>
          <template #footer-confirm>
            <div style="color: blue; font-size: 18px">我同意</div>
          </template>
        </t-dialog>
      </t-cell>
    </t-cell-group>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';

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
      title: '标题',
      content: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      placeholderText: '输入框提示文字',
      cancelButtonText: '我再想想',
      confirmButtonText: '继续',
      zIndex: 3000,
      width: 250,
      showHeader: false,
      showFooter: false,
      isInput: true,
      isShowDialog1: false,
      isShowDialog2: false,
    };
  },
  methods: {
    changeDialogVisible(idx: number) {
      switch (idx) {
        case 1: {
          this.isShowDialog1 = true;
          this.isShowDialog2 = false;
          break;
        }
        case 2: {
          this.isShowDialog2 = true;
          this.isShowDialog1 = false;
          break;
        }
        default: {
          break;
        }
      }
    },

    onConfirm(e: string) {
      console.log('dialog:confirm', e);
    },

    onCancel() {
      console.log('dialog:cancel');
    },

    openDialog() {
      console.log('dialog:opened');
    },

    closeDialog() {
      console.log('dialog:closed');
    },

    changeVisible(e: boolean) {
      console.log('dialog:visible-change', e);
    },

    clickOverlay() {
      console.log('dialog:clickOverlay');
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
