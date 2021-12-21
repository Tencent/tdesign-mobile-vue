<template>
  <div class="dialog-base">
    <div class="tdesign-demo-block">
      <t-cell-group title="反馈类对话框">
        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(1)"> 单行标题对话框 </t-button>
          <t-dialog v-model="isShowDialog1" :title="singleHeader"> </t-dialog>
        </t-cell>
        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(2)"> 多行标题对话框 </t-button>
          <t-dialog v-model="isShowDialog2" :title="moreTextHeader"> </t-dialog>
        </t-cell>
        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(3)"> 短文本对话框 </t-button>
          <t-dialog
            v-model="isShowDialog3"
            :content="content"
            @confirm="onConfirm"
            @opened="openDialog"
            @closed="closeDialog"
            @overlay-click="clickOverlay"
            @visible-change="changeVisible"
          >
          </t-dialog>
        </t-cell>
        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(4)"> 长文本对话框 </t-button>
          <t-dialog v-model="isShowDialog4" :title="title"> </t-dialog>
        </t-cell>
      </t-cell-group>
    </div>
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
      title: '对话框标题',
      moreTextHeader: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      singleHeader: '最小高度样式，文案上下居中',
      content: '告知当前状态、信息和解决方法',
      moreTextContent: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      width: 250,
      showHeader: false,
      showFooter: false,
      showOverlay: false,
      isInput: true,
      isShowDialog1: false,
      isShowDialog2: false,
      isShowDialog3: false,
      isShowDialog4: false,
    };
  },
  methods: {
    changeDialogVisible(idx: number) {
      switch (idx) {
        case 1: {
          this.isShowDialog1 = true;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          break;
        }
        case 2: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = true;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          break;
        }
        case 3: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = true;
          this.isShowDialog4 = false;
          break;
        }
        case 4: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = true;
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

<style lang="less">
.dialog-base {
  .t-button:not(:last-child) {
    margin-right: 24px;
  }
}
</style>
