<template>
  <div :class="`${name}`">
    <t-cell value-align="left" class="tdesign-demo--dialog">
      <t-button theme="primary" size="middle" class="buttom-item" @click="changeDialogVisible(1)">
        单行标题
      </t-button>
      <t-button theme="primary" size="middle" @click="changeDialogVisible(2)">
        带说明文本
      </t-button>
    </t-cell>
    <t-dialog
        v-model="isShowDialog1"
        :show-overlay="showOverlay"
        type="confirm"
        :is-input="isInput"
        :header="header"
        :placeholder-text="placeholderText"
        :cancel-button-text="cancelButtonText"
        :confirm-button-text="confirmButtonText"
        @confirm="onConfirm"
        @cancel="onCancel">
        <template #footer-cancel>
          <div style="color:#000000;font-size:18px;">我不同意</div>
        </template>
        <template #footer-confirm>
          <div style="color:#0052D9;font-size:18px;">我同意</div>
        </template>
    </t-dialog>
     <t-dialog
        v-model="isShowDialog2"
        :show-overlay="showOverlay"
        type="confirm"
        :is-input="isInput"
        :header="header"
        :content="content"
        :placeholder-text="placeholderText"
        :cancel-button-text="cancelButtonText"
        :confirm-button-text="confirmButtonText"
        @confirm="onConfirm"
        @cancel="onCancel">
        <template #footer-cancel>
          <div style="color:#000000;font-size:18px;">我不同意</div>
        </template>
        <template #footer-confirm>
          <div style="color:#0052D9;font-size:18px;">我同意</div>
        </template>
    </t-dialog>
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
          this.isShowDialog1 = false;
          this.isShowDialog2 = true;
          break;
        }
        default: {
          break;
        }
      }
    },
    onConfirm(e: string)  {
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

    clickoverlay() {
      console.log('dialog:clickoverlay');
    },
  },
});
</script>

<style lang="less" scoped>
.tdesign-demo--dialog {
  .t-button:not(:last-child){
    margin-right: 20px;
  }
}
</style>

