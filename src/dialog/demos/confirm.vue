<template>
  <div :class="`${name}`" >
     <t-cell-group  class="tdesign-demo--dialog">
        <t-cell value-align="left">
          <t-button theme="primary" @click="changeDialogVisible(5)">
            双操作对话框
          </t-button>
          <t-button theme="primary" @click="changeDialogVisible(6)">
            带警示操作对话框
          </t-button>
          <t-dialog
            v-model="isShowDialog5"
            type="confirm"
            :header="header"
            :content="content"
            :cancel-button-text="cancelButtonText"
            :confirm-button-text="confirmButtonText"
            @confirm="onConfirm"
            @cancel="onCancel">
          </t-dialog>
          <t-dialog
            v-model="isShowDialog6"
            type="confirm"
            :header="header"
            :content="moreTextContent"
            :cancel-button-text="cancelButtonText"
            :confirm-button-text="confirmButtonText"
            @confirm="onConfirm"
            @cancel="onCancel">
            <template #footer-cancel>
              <div style="color:#000;font-size:18px;">辅助操作</div>
            </template>
            <template #footer-confirm>
              <div style="color:#E34D59;font-size:18px;">我同意</div>
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
      header: '对话框标题',
      content: '告知当前状态、信息和解决方法',
      moreTextContent: '告知当前状态、信息和解决方法，等内容。描述文案尽可能控制在三行内',
      cancelButtonText: '我再想想',
      confirmButtonText: '继续',
      width: 250,
      showHeader: false,
      showFooter: false,
      showOverlay: false,
      isInput: true,
      isShowDialog5: false,
      isShowDialog6: false,
    };
  },
  methods: {
    changeDialogVisible(idx: number) {
      switch (idx) {
        case 5: {
          this.isShowDialog5 = true;
          this.isShowDialog6 = false;
          break;
        }
        case 6: {
          this.isShowDialog5 = false;
          this.isShowDialog6 = true;
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

