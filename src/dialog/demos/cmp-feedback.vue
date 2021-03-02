<template>
  <div class="dialog-base">
    <div class="tdesign-demo-block">
      <t-cell-group title="组件调用: 反馈类弹框——默认">
        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(1)">
            默认反馈弹框
          </t-button>
          <t-dialog
            v-model="isShowDialog1"
            :content="content">
          </t-dialog>
        </t-cell>
      </t-cell-group>

      <t-cell-group title="组件调用: 反馈类弹框——自定义宽度、层级、header">
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
      </t-cell-group>

      <t-cell-group title="组件调用: 反馈类弹框——事件调用">
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
      header: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      singleHeader:'最小高度样式，文案上下居中',
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
    };
  },
  methods: {
    changeDialogVisible(idx: number) {
      switch (idx) {
        case 1: {
          this.isShowDialog1 = true;
          this.isShowDialog2 = false;
          this.isShowDialog3 = false;
          break;
        }
        case 2: {
          this.isShowDialog2 = true;
          this.isShowDialog1 = false;
          this.isShowDialog3 = false;
          break;
        }
        case 3: {
          this.isShowDialog3 = true;
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
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
