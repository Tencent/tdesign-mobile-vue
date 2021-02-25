<template>
  <div :class="`${name}`">
    <t-cell value-align="left">
      <t-button theme="primary" size="middle" class="buttom-item"  @click="changeDialogVisible(1)">
        单行标题
      </t-button>
       <t-button theme="primary" size="middle" class="buttom-item" @click="changeDialogVisible(2)">
        多行标题
      </t-button>
       <t-button theme="primary" size="middle" class="buttom-item" @click="changeDialogVisible(3)">
        短文本
      </t-button>
       <t-button theme="primary" size="middle" class="buttom-item" @click="changeDialogVisible(4)">
        长文本
      </t-button>
    </t-cell>
    <!-- 单行标题  -->
    <t-dialog
      v-model="isShowDialog1"
      :header="singleHeader"
      :show-footer="showFooter"
      @clickoverlay="clickoverlay"
      @confirm="onConfirm"
      @opened="openDialog"
      @closed="closeDialog"
      @visible-change="changeVisible"
    />

    <!-- 多行标题 -->
    <t-dialog
      v-model="isShowDialog2"
      :header="header"
      @clickoverlay="clickoverlay"
      @confirm="onConfirm"
      @opened="openDialog"
      @closed="closeDialog"
      @visible-change="changeVisible"
    >
    </t-dialog>
    <!-- 短文本 -->
    <t-dialog
      v-model="isShowDialog3"
      :content="content"
      @clickoverlay="clickoverlay"
      @confirm="onConfirm"
      @opened="openDialog"
      @closed="closeDialog"
      @visible-change="changeVisible"
    >
    </t-dialog>
    <!-- 长文本 -->
    <t-dialog
        v-model="isShowDialog4"
        :content="content"
        :show-header="showHeader"
    >
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
      isShowDialog2:false,
      isShowDialog3:false,
      isShowDialog4:false,
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
          this.isShowDialog2 = true;
          this.isShowDialog3 = false;
          this.isShowDialog4 = false;
          this.isShowDialog1 = false;
          break;
        }
        case 3: {
          this.isShowDialog3 = true;
          this.isShowDialog1 = false;
          this.isShowDialog2 = false;
          this.isShowDialog4 = false;
          break;
        }
        case 4: {
          this.isShowDialog4 = true;
          this.isShowDialog1 = false;
          this.isShowDialog3 = false;
          this.isShowDialog2 = false;
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

<style lang="less" scoped>
.buttom-item{
  margin-right: 20px;
}
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
