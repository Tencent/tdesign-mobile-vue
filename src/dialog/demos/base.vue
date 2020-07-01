<template>
  <div class="tdesign-demo--dialog">
    <div>
      <div class="dialog-type-title">反馈类弹框</div>
      <div class="block">
        <t-button @click="changeDialogVisible(2)">反馈类对话框-含标题含底部</t-button>
        <t-dialog
          :tips="tips"
          :title="title"
          :isShowDialog="isShowDialog2"
          @confirm="onConfirm"
          @cancel="onCancel">
          <template #title>
            <div style="color:red;font-size:18px;">特此警告</div>
          </template>
        </t-dialog>
      </div>

      <div class="block">
        <t-button @click="changeDialogVisible(7)">反馈类对话框-含标题</t-button>
        <t-dialog
          :showFooter="showFooter"
          :tips="tips"
          :isShowDialog="isShowDialog7"
          @cancel="onCancel"></t-dialog>
      </div>

      <div class="block">
        <t-button @click="changeDialogVisible(3)">反馈类对话框-含底部-开关事件</t-button>
        <t-dialog
          :showTitle="showTitle"
          :tips="tips"
          :isShowDialog="isShowDialog3"
          @opened="openDialog"
          @closed="closeDialog"
          @cancel="onCancel"
          @confirm="onConfirm">
          <template #footer>
            <div style="color:pink;font-size:18px;">我同意</div>
          </template>
        </t-dialog>
      </div>
    </div>

    <div>
      <div class="dialog-type-title">确认类弹框</div>
      <div class="block">
        <t-button @click="changeDialogVisible(4)">确认类对话框-含标题含input含底部</t-button>
        <t-dialog
          type="confirm"
          :isInput="isInput"
          :title="title"
          :tips="tips"
          :placeholderText="placeholderText"
          :isShowDialog="isShowDialog4"
          :cancelButtonText="cancelButtonText"
          :confirmButtonText="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel">
          <template #footer-cancel>
            <div style="color:grey;font-size:18px;">我不同意</div>
          </template>
          <template #footer-confirm>
            <div style="color:blue;font-size:18px;">我同意</div>
          </template>
        </t-dialog>
      </div>

      <div class="block">
        <t-button @click="changeDialogVisible(5)">确认类对话框-含标题</t-button>
        <t-dialog
          type="confirm"
          :tips="tips"
          :isShowDialog="isShowDialog5"
          :showFooter="showFooter"
          @confirm="onConfirm"
          @cancel="onCancel">
          <template #tips>
            <div style="color:red;">这是一个含标题的确认对话框，请确认你的操作！</div>
          </template>
        </t-dialog>
      </div>

      <div class="block">
        <t-button @click="changeDialogVisible(6)">确认类对话框-含input</t-button>
        <t-dialog
          type="confirm"
          :showTitle="showTitle"
          :tips="tips"
          :isInput="isInput"
          :showFooter="showFooter"
          :isShowDialog="isShowDialog6"
          @confirm="onConfirm"
          @cancel="onCancel"></t-dialog>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
  setup() {
    const title = ref('标题');
    const tips = ref('告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内');
    const placeholderText = ref('输入框提示文字');
    const cancelButtonText = ref('我再想想');
    const confirmButtonText = ref('继续');
    const showTitle = ref(false);
    const showFooter = ref(false);
    const isInput = ref(true);
    const isShowDialog1 = ref(false);
    const isShowDialog2 = ref(false);
    const isShowDialog3 = ref(false);
    const isShowDialog4 = ref(false);
    const isShowDialog5 = ref(false);
    const isShowDialog6 = ref(false);
    const isShowDialog7 = ref(false);

    const changeDialogVisible = (idx: number) => {
      switch (idx) {
        case 1: {
          isShowDialog1.value = !isShowDialog1.value;
          isShowDialog2.value = false;
          isShowDialog3.value = false;
          isShowDialog4.value = false;
          isShowDialog5.value = false;
          isShowDialog6.value = false;
          isShowDialog7.value = false;
          break;
        }
        case 2: {
          isShowDialog2.value = !isShowDialog2.value;
          isShowDialog1.value = false;
          isShowDialog3.value = false;
          isShowDialog4.value = false;
          isShowDialog5.value = false;
          isShowDialog6.value = false;
          isShowDialog7.value = false;
          break;
        }
        case 3: {
          isShowDialog3.value = !isShowDialog3.value;
          isShowDialog1.value = false;
          isShowDialog2.value = false;
          isShowDialog4.value = false;
          isShowDialog5.value = false;
          isShowDialog6.value = false;
          isShowDialog7.value = false;
          break;
        }
        case 4: {
          isShowDialog4.value = !isShowDialog4.value;
          isShowDialog1.value = false;
          isShowDialog2.value = false;
          isShowDialog3.value = false;
          isShowDialog5.value = false;
          isShowDialog6.value = false;
          isShowDialog7.value = false;
          break;
        }
        case 5: {
          isShowDialog5.value = !isShowDialog5.value;
          isShowDialog1.value = false;
          isShowDialog2.value = false;
          isShowDialog4.value = false;
          isShowDialog3.value = false;
          isShowDialog6.value = false;
          isShowDialog7.value = false;
          break;
        }
        case 6: {
          isShowDialog6.value = !isShowDialog6.value;
          isShowDialog1.value = false;
          isShowDialog2.value = false;
          isShowDialog3.value = false;
          isShowDialog4.value = false;
          isShowDialog5.value = false;
          isShowDialog7.value = false;
          break;
        }
        case 7: {
          isShowDialog7.value = !isShowDialog7.value;
          isShowDialog1.value = false;
          isShowDialog2.value = false;
          isShowDialog3.value = false;
          isShowDialog4.value = false;
          isShowDialog5.value = false;
          isShowDialog6.value = false;
          break;
        }
        default: {
          break;
        }
      }
    };

    const onConfirm = (e: any) => {
      console.log('dialog:confirm', e);
      isShowDialog1.value = false;
      isShowDialog2.value = false;
      isShowDialog3.value = false;
      isShowDialog4.value = false;
      isShowDialog5.value = false;
      isShowDialog6.value = false;
      isShowDialog7.value = false;
    };

    const onCancel = () => {
      console.log('dialog:cancel');
      isShowDialog1.value = false;
      isShowDialog2.value = false;
      isShowDialog3.value = false;
      isShowDialog4.value = false;
      isShowDialog5.value = false;
      isShowDialog6.value = false;
      isShowDialog7.value = false;
    };

    const openDialog = (e: any) => {
      console.log('dialog:open', e);
    };

    const closeDialog = (e: any) => {
      console.log('dialog:close', e);
    };

    return {
      title,
      tips,
      placeholderText,
      isInput,
      isShowDialog1,
      isShowDialog2,
      isShowDialog3,
      isShowDialog4,
      isShowDialog5,
      isShowDialog6,
      isShowDialog7,
      changeDialogVisible,
      onConfirm,
      onCancel,
      showTitle,
      showFooter,
      cancelButtonText,
      confirmButtonText,
      openDialog,
      closeDialog,
    };
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
