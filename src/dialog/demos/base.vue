<template>
  <div :class="`${name}`">
    <t-cell-group title="方式一：组件调用">
      <t-cell-group class="dialog-type-title" title="反馈类弹框">
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeDialogVisible(2)">
            含header含footer，宽度、层级自定义
          </t-button>
          <t-dialog
            v-model="isShowDialog"
            :content="content"
            :z-index="zIndex"
            :width="width">
            <template #header>
              <div style="color:red;font-size:18px;">特此警告</div>
            </template>
          </t-dialog>
        </t-cell>

        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeDialogVisible(7)">
            含默认header/宽度/层级,事件调用
          </t-button>
          <t-dialog
            v-model="isShowDialog7"
            :show-footer="showFooter"
            :content="content"
            @clickoverlay="clickoverlay"
            @confirm="onConfirm"
            @opened="openDialog"
            @closed="closeDialog"
            @visible-change="changeVisible"></t-dialog>
        </t-cell>

        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeDialogVisible(3)">
            含默认footer，宽度、层级默认
          </t-button>
          <t-dialog
            v-model="isShowDialog3"
            :show-header="showHeader"
            :content="content">
            <template #footer>
              <div style="color:pink;font-size:18px;">我同意</div>
            </template>
          </t-dialog>
        </t-cell>
      </t-cell-group>

      <t-cell-group class="dialog-type-title" title="确认类弹框">
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeDialogVisible(4)">
            含标题含input含底部
          </t-button>
          <t-dialog
            v-model="isShowDialog4"
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
              <div style="color:grey;font-size:18px;">我不同意</div>
            </template>
            <template #footer-confirm>
              <div style="color:blue;font-size:18px;">我同意</div>
            </template>
          </t-dialog>
        </t-cell>

        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeDialogVisible(5)">
            含标题
          </t-button>
          <t-dialog
            v-model="isShowDialog5"
            type="confirm"
            :show-footer="showFooter"
            @confirm="onConfirm"
            @cancel="onCancel">
            <template #content>
              <div style="color:red;">这是一个含标题的确认对话框，请确认你的操作！</div>
            </template>
          </t-dialog>
        </t-cell>

        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeDialogVisible(6)">
            含input
          </t-button>
          <t-dialog
            v-model="isShowDialog6"
            type="confirm"
            :show-header="showHeader"
            :content="content"
            :is-input="isInput"
            :show-footer="showFooter"
            @confirm="onConfirm"
            @cancel="onCancel"></t-dialog>
        </t-cell>
      </t-cell-group>
    </t-cell-group>

    <t-cell-group title="方式二：函数调用">
      <t-cell-group class="dialog-type-title" title="反馈类弹框">
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeFunctionVisible(1)">
            含标题含底部
          </t-button>
        </t-cell>
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeFunctionVisible(2)">
            含标题
          </t-button>
        </t-cell>
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeFunctionVisible(3)">
            含底部
          </t-button>
        </t-cell>
      </t-cell-group>

      <t-cell-group class="dialog-type-title" title="确认类弹框">
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeFunctionVisible(4)">
            含标题含底部含input
          </t-button>
        </t-cell>
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeFunctionVisible(5)">
            含标题含底部
          </t-button>
        </t-cell>
        <t-cell value-align="left">
          <t-button theme="primary" size="large" @click="changeFunctionVisible(6)">
            含input含底部
          </t-button>
        </t-cell>
      </t-cell-group>
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

    clickoverlay() {
      console.log('dialog:clickoverlay');
    },

    changeFunctionVisible(idx: number) {
      switch (idx) {
        case 1: {
          Dialog.show({
            showOverlay: false,
            content: '我的家里有个人很酷',
            knowContent: 'i know',
          });
          break;
        }
        case 2: {
          Dialog.show({
            width: '350px',
            showFooter: false,
            content: '我的家里有个人很酷!',
            knowContent: 'i know',
          });
          break;
        }
        case 3: {
          Dialog.alert({
            showHeader: false,
            content: '我的家里有个人很酷',
            knowContent: 'i know',
          });
          break;
        }
        case 4: {
          Dialog.confirm({
            isInput: true,
            content: '我的家里有个人很酷',
            knowContent: 'i know',
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
          Dialog.confirm({
            content: '我的家里有个人很酷',
            knowContent: 'i know',
          });
          break;
        }
        case 6: {
          Dialog.confirm({
            isInput: true,
            showHeader: false,
            content: '我的家里有个人很酷',
            knowContent: 'i know',
          });
          break;
        }
      }
    },
  },
});
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
