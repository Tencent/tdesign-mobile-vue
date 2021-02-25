<template>
  <div class="dialog-base">
    <div class="tdesign-demo-block">
      <t-cell-group title="组件调用: 反馈类弹框">
        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(1)">
            默认反馈弹框
          </t-button>
          <t-dialog
            v-model="isShowDialog1"
            :content="content">
          </t-dialog>
        </t-cell>

        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(2)">
            自定义反馈弹框
          </t-button>
          <t-dialog
            v-model="isShowDialog2"
            :content="content"
            :z-index="zIndex"
            :width="width">
            <template #header>
              <div style="color:red;font-size:18px;">特此警告</div>
            </template>
          </t-dialog>
        </t-cell>

        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(3)">
            事件调用反馈弹框
          </t-button>
          <t-dialog
            v-model="isShowDialog3"
            :content="content"
            @confirm="onConfirm"
            @opened="openDialog"
            @closed="closeDialog"
            @click-overlay="clickOverlay"
            @visible-change="changeVisible">
          </t-dialog>
        </t-cell>
      </t-cell-group>

      <t-cell-group title="组件调用: 确认类弹框">
      <t-cell value-align="left">
        <t-button theme="primary" @click="changeDialogVisible(4)">
          默认用法
        </t-button>
        <t-dialog
          v-model="isShowDialog4"
          type="confirm"
          :header="header"
          :content="content"
          :placeholder-text="placeholderText"
          :cancel-button-text="cancelButtonText"
          :confirm-button-text="confirmButtonText"
          @confirm="onConfirm"
          @cancel="onCancel">
        </t-dialog>
      </t-cell>

      <t-cell value-align="left">
        <t-button theme="primary" @click="changeDialogVisible(5)">
          input用法
        </t-button>
        <t-dialog
          v-model="isShowDialog5"
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
    </t-cell-group>

    <t-cell-group title="函数调用: 反馈类弹框">
      <t-cell value-align="left">
        <t-button theme="primary" @click="changeFunctionVisible1()">
          反馈类弹出框
        </t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="函数调用: 反馈类弹框">
      <t-cell value-align="left">
        <t-button theme="primary" @click="changeFunctionVisible2">
          反馈类弹出框
        </t-button>
      </t-cell>
    </t-cell-group>
    </div>
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
      isShowDialog3: false,
      isShowDialog4: false,
      isShowDialog5: false,
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
          break;
        }
        case 2: {
          this.isShowDialog2 = true;
          this.isShowDialog1 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          break;
        }
        case 3: {
          this.isShowDialog3 = true;
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog4 = false;
          this.isShowDialog5 = false;
          break;
        }
        case 4: {
          this.isShowDialog4 = true;
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog5 = false;
          break;
        }
        case 5: {
          this.isShowDialog5 = true;
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
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
