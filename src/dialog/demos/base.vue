<template>
  <div class="tdesign-demo--dialog">
    <div>
      <div class="dialog-type-title">反馈类弹框</div>
      <div class="block">
        <t-button @click="changeDialogVisible(2)">反馈类对话框-含标题含底部</t-button>
        <t-dialog
          :content="content"
          :title="title"
          :zIndex="zIndex"
          :width="width"
          v-model="isShowDialog"
          @clickoverlay='clickoverlay'
          @confirm="onConfirm">
          <template #title>
            <div style="color:red;font-size:18px;">特此警告</div>
          </template>
        </t-dialog>
      </div>

      <div class="block">
        <t-button @click="changeDialogVisible(7)">反馈类对话框-含标题</t-button>
        <t-dialog
          :showFooter="showFooter"
          :content="content"
          v-model="isShowDialog7"></t-dialog>
      </div>

      <div class="block">
        <t-button @click="changeDialogVisible(3)">反馈类对话框-含底部-开关事件</t-button>
        <t-dialog
          :showTitle="showTitle"
          :content="content"
          v-model="isShowDialog3"
          @opened="openDialog"
          @closed='closeDialog'
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
          :content="content"
          :placeholderText="placeholderText"
          v-model="isShowDialog4"
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
          :content="content"
          v-model="isShowDialog5"
          :showFooter="showFooter"
          @confirm="onConfirm"
          @cancel="onCancel">
          <template #content>
            <div style="color:red;">这是一个含标题的确认对话框，请确认你的操作！</div>
          </template>
        </t-dialog>
      </div>

      <div class="block">
        <t-button @click="changeDialogVisible(6)">确认类对话框-含input</t-button>
        <t-dialog
          type="confirm"
          :showTitle="showTitle"
          :content="content"
          :isInput="isInput"
          :showFooter="showFooter"
          v-model="isShowDialog6"
          @confirm="onConfirm"
          @cancel="onCancel"></t-dialog>
      </div>
    </div>

    <div>
      <div class="block">
        <div class="dialog-type-title">函数调用-反馈类弹框</div>
        <t-button @click="changeFunctionVisible(1)">反馈类弹框——含标题含底部</t-button>
        <t-button @click="changeFunctionVisible(2)">反馈类弹框——含标题</t-button>
        <t-button @click="changeFunctionVisible(3)">反馈类弹框——含底部</t-button>
      </div>
    </div>

    <div>
      <div class="block">
        <div class="dialog-type-title">函数调用-确认类弹框</div>
        <t-button @click="changeFunctionVisible(4)">确认类弹框——含标题含底部含input</t-button>
        <t-button @click="changeFunctionVisible(5)">确认类弹框——含标题含底部</t-button>
        <t-button @click="changeFunctionVisible(6)">确认类弹框——含input含底部</t-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import DialogFunc from '../index.func';

export default {
  data() {
    return {
      title: '标题',
      content: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      placeholderText: '输入框提示文字',
      cancelButtonText: '我再想想',
      confirmButtonText: '继续',
      zIndex: 3000,
      width: 250,
      showTitle: false,
      showFooter: false,
      isInput: true,
      isShowDialog: false,
      isShowDialog3: false,
      isShowDialog4: false,
      isShowDialog5: false,
      isShowDialog6: false,
      isShowDialog7: false,
    };
  },
  methods: {
    changeDialogVisible(idx: number) {
      switch (idx) {
        case 2: {
          this.isShowDialog = true;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          break;
        }
        case 3: {
          this.isShowDialog3 = true;
          this.isShowDialog = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          break;
        }
        case 4: {
          this.isShowDialog4 = true;
          this.isShowDialog = false;
          this.isShowDialog3 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          break;
        }
        case 5: {
          this.isShowDialog5 = true;
          this.isShowDialog = false;
          this.isShowDialog4 = false;
          this.isShowDialog3 = false;
          this.isShowDialog6 = false;
          this.isShowDialog7 = false;
          break;
        }
        case 6: {
          this.isShowDialog6 = true;
          this.isShowDialog = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog7 = false;
          break;
        }
        case 7: {
          this.isShowDialog7 = true;
          this.isShowDialog = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          this.isShowDialog6 = false;
          break;
        }
        default: {
          break;
        }
      }
    },

    onConfirm(e:any)  {
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

    clickoverlay() {
      console.log('dialog:clickoverlay');
    },

	  $dialog: DialogFunc,
    changeFunctionVisible(idx: number) {
      switch (idx) {
        case 1: {
          this.$dialog({
            showOverlay: false,
            content: '我的家里有个人很酷',
            knowContent: 'i know',
          });
          break;
        }
        case 2: {
          this.$dialog({
            width: '350px',
            showFooter: false,
            content: '我的家里有个人很酷!',
            knowContent: 'i know',
          });
          break;
        }
        case 3: {
          this.$dialog({
            showTitle: false,
            content: '我的家里有个人很酷',
            knowContent: 'i know',
          });
          break;
        }
        case 4: {
          this.$dialog({
            isInput: true,
            content: '我的家里有个人很酷',
            knowContent: 'i know',
            type: 'confirm',
            placeholderText: '请输入您的名字',
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
          break;
        }
        case 5: {
          this.$dialog({
            content: '我的家里有个人很酷',
            knowContent: 'i know',
            type: 'confirm',
          });
          break;
        }
        case 6: {
          this.$dialog({
            isInput: true,
            showTitle: false,
            content: '我的家里有个人很酷',
            knowContent: 'i know',
            type: 'confirm',
          });
          break;
        }
      }
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
