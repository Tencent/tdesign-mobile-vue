<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Dialog 对话框</h1>
    <p class="summary">用于显示重要提示或请求用户进行重要操作，一种打断当前操作的模态视图。</p>
    <tdesign-demo-block title="01 类型" summary="反馈类对话框">
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(1)"> 单行标题 </t-button>
        <t-button variant="outline" size="large" @click="changeDialogVisible(2)"> 多行标题最大高度 </t-button>
        <t-button variant="outline" size="large" @click="changeDialogVisible(3)"> 带说明文本 </t-button>
        <t-button variant="outline" size="large" @click="changeDialogVisible(4)"> 带说明文本最大高度 </t-button>
        <!-- <t-button variant="outline" size="large" @click="eventDialog()"> 函数调用长文本对话框 </t-button> -->
        <t-dialog
          v-model:visible="isShowDialog1"
          :title="singleHeader"
          :confirm-btn="confirmButtonText"
          :close-on-overlay-click="false"
          :show-overlay="showOverlay"
        >
        </t-dialog>
        <t-dialog v-model:visible="isShowDialog2" :title="moreTextHeader" :confirm-btn="confirmButtonText"> </t-dialog>
        <t-dialog
          v-model:visible="isShowDialog3"
          :title="title"
          content="告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内"
          :confirm-btn="confirmButtonText"
          @confirm="onConfirm"
          @overlay-click="onClickOverlay"
        >
        </t-dialog>
        <t-dialog
          v-model:visible="isShowDialog4"
          :title="title"
          :content="moreTextContent"
          :confirm-btn="confirmButtonText"
        ></t-dialog>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="确认类对话框">
      <div class="dialog-demo">
        <t-button variant="outline" size="large" @click="changeDialogVisible(5)"> 双按钮 </t-button>
        <t-button variant="outline" size="large" @click="changeDialogVisible(6)"> 带警示按钮 </t-button>
        <t-dialog
          v-model:visible="isShowDialog5"
          type="confirm"
          :title="title"
          :content="content"
          :placeholder-text="placeholderText"
          :cancel-btn="cancelButtonText"
          :confirm-btn="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel"
        >
        </t-dialog>
        <t-dialog
          v-model:visible="isShowDialog6"
          type="confirm"
          :title="title"
          :content="moreTextContent"
          :cancel-btn="cancelButtonText"
          :confirm-btn="{ content: '警示操作', theme: 'danger' }"
          @confirm="onConfirm"
          @cancel="onCancel"
          @close="onClose"
        >
        </t-dialog>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="输入对话框">
      <div class="dialog-demo" style="padding-bottom: 20px">
        <t-button variant="outline" size="large" @click="changeDialogVisible(7)"> 单行标题对话框 </t-button>
        <t-button variant="outline" size="large" @click="changeDialogVisible(8)"> 带说明文本对话框 </t-button>
        <t-dialog
          v-model:visible="isShowDialog7"
          :title="singleHeader"
          :cancel-btn="cancelButtonText"
          :confirm-btn="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
        >
          <template #footer-confirm>
            <div>我同意</div>
          </template>
          <template #footer-cancel>
            <div>我不同意</div>
          </template>
        </t-dialog>
        <t-dialog
          v-model:visible="isShowDialog8"
          :title="title"
          :content="content"
          :cancel-btn="cancelButtonText"
          :confirm-btn="confirmButtonText"
          :button-layout="buttonLayout"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
        >
          <template #other-content>
            <t-input type="text" placeholder="输入文案" />
          </template>
          <template #footer-confirm>
            <div>我同意</div>
          </template>
          <template #footer-cancel>
            <div>我不同意</div>
          </template>
        </t-dialog>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { Dialog } from '../../components';

export default defineComponent({
  setup() {},
  data() {
    return {
      title: '对话框标题',
      moreTextHeader: '对话框标题告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      singleHeader: '最小高度样式，文案上下居中',
      content: '告知当前状态、信息和解决方法',
      moreTextContent:
        '告知当前状态、信息和解决方法，等内容。描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很告知当前状态、信息和解决方法，等内容。描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很多描述文案很',
      placeholderText: '输入框提示文字',
      cancelButtonText: '取消',
      confirmButtonText: '知道了',
      buttonLayout: 'vertical',
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
      actions: ['abbb', 'asdasd'],
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

    eventDialog() {
      Dialog.alert(this.moreTextContent);
    },

    onConfirm() {
      console.log('dialog:confirm');
    },

    onCancel() {
      console.log('dialog:cancel');
    },

    onClose(e: string) {
      console.log('dialog:close', e);
    },

    onClickOverlay() {
      console.log('dialog:clickOverlay');
    },

    onChange(e: boolean) {
      console.log('dialog:value change', e);
    },
  },
});
</script>

<style scoped lang="less">
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
