<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Dialog 对话框</h1>
    <p class="summary">用于显示重要提示或请求用户进行重要操作，一种打断当前操作的模态视图。</p>
    <tdesign-demo-block title="01 类型" summary="反馈类对话框">
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(1)"> 单行标题对话框 </t-button>
        <t-dialog v-model="isShowDialog1" :header="singleHeader"> </t-dialog>
      </div>
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(2)"> 多行标题对话框 </t-button>
        <t-dialog v-model="isShowDialog2" :header="moreTextHeader"> </t-dialog>
      </div>
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(3)"> 短文本对话框 </t-button>
        <t-dialog
          v-model="isShowDialog3"
          :content="content"
          @confirm="onConfirm"
          @opened="openDialog"
          @closed="closeDialog"
          @click-overlay="clickOverlay"
          @visible-change="changeVisible"
        >
        </t-dialog>
      </div>
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(4)"> 长文本对话框 </t-button>
        <t-dialog v-model="isShowDialog4" :header="header"> </t-dialog>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="确认类对话框">
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(5)"> 双操作对话框 </t-button>
        <t-dialog
          v-model="isShowDialog5"
          type="confirm"
          :header="header"
          :content="content"
          :placeholder-text="placeholderText"
          :cancel-button-text="cancelButtonText"
          :confirm-button-text="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
        </t-dialog>
      </div>
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(6)"> 带警示操作对话框 </t-button>
        <t-dialog
          v-model="isShowDialog6"
          type="confirm"
          :header="header"
          :content="moreTextContent"
          :cancel-button-text="cancelButtonText"
          :confirm-button-text="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <template #footer-cancel>
            <div style="color: #000; font-size: 18px">辅助操作</div>
          </template>
          <template #footer-confirm>
            <div style="color: #e34d59; font-size: 18px">我同意</div>
          </template>
        </t-dialog>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="输入对话框">
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(7)"> 单行标题对话框 </t-button>
        <t-dialog
          v-model="isShowDialog7"
          type="confirm"
          :is-input="isInput"
          :header="singleHeader"
          :placeholder-text="placeholderText"
          :cancel-button-text="cancelButtonText"
          :confirm-button-text="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <template #footer-cancel>
            <div style="color: #000000; font-size: 18px">我不同意</div>
          </template>
          <template #footer-confirm>
            <div style="color: #0052d9; font-size: 18px">我同意</div>
          </template>
        </t-dialog>
      </div>
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(8)"> 带说明文本对话框 </t-button>
        <t-dialog
          v-model="isShowDialog8"
          type="confirm"
          :is-input="isInput"
          :header="header"
          :content="content"
          :placeholder-text="placeholderText"
          :cancel-button-text="cancelButtonText"
          :confirm-button-text="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
          <template #footer-cancel>
            <div style="color: #000000; font-size: 18px">我不同意</div>
          </template>
          <template #footer-confirm>
            <div style="color: #0052d9; font-size: 18px">我同意</div>
          </template>
        </t-dialog>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

import config from '@/config';
import Dialog from '../index';

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
      header: '对话框标题',
      moreTextHeader: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      singleHeader: '最小高度样式，文案上下居中',
      content: '告知当前状态、信息和解决方法',
      moreTextContent: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
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
      isShowDialog3: false,
      isShowDialog4: false,
      isShowDialog5: false,
      isShowDialog6: false,
      isShowDialog7: false,
      isShowDialog8: false,
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
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          this.isShowDialog8 = false;
          break;
        }
        case 2: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = true;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          this.isShowDialog8 = false;
          break;
        }
        case 3: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = true;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          this.isShowDialog8 = false;
          break;
        }
        case 4: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = true;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          this.isShowDialog8 = false;
          break;
        }
        case 5: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = true;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          this.isShowDialog8 = false;
          break;
        }
        case 6: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = true;
          this.isShowDialog7 = false;
          this.isShowDialog8 = false;
          break;
        }
        case 7: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = true;
          this.isShowDialog8 = false;
          break;
        }
        case 8: {
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          this.isShowDialog8 = true;
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

    changeFunctionVisible2() {
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

    changeFunctionVisible1() {
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

<style lang="less">
.dialog-base {
  .t-button:not(:last-child) {
    margin-right: 24px;
  }
}
</style>
