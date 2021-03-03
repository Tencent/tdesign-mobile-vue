<template>
  <div :class="`${name}`">

    <t-cell-group title="文本轻提示">
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showText(text1)">短文本轻提示</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showText(text2)">长文本轻提示</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="图标轻提示">
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showSuccess()">成功</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showFail()">警告</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showLoading()">加载</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showCustom()">自定义图标</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="图标加文本轻提示">
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showSuccess(success)">成功</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showFail(fail)">警告</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showLoading(loading)">加载</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showCustom(custom)">自定义图标</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="提示位置">
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showPosition('top')">顶部Top</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showPosition('middle')">中间Middle</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showPosition('bottom')">底部Bottom</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="z遮罩">
      <t-cell value-align="left">
        <t-button size="large" variant="outline" @click="showMask">带背景遮罩</t-button>
      </t-cell>
    </t-cell-group>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

import Toast from '../index';
import config from '@/config';
import { ToastPositionType } from '../toast.interface';

const { prefix } = config;
const name = `${prefix}-toast-base-demo`;

export default defineComponent({
  setup() {
    return {
      name: ref(name),
    };
  },
  data() {
    return {
      text1: '轻提示内容',
      text2: '这是一条很长的轻提示内容，这是一条很长的轻提示内容',
      success: '成功文案',
      fail: '失败文案',
      loading: '加载',
      custom: '自定义图标',
    };
  },
  methods: {
    showText(message?: string) {
      Toast(message);
    },
    showSuccess(message?: string) {
      Toast.success(message);
    },
    showFail(message?: string) {
      Toast({
        type: 'fail',
        message,
      });
    },
    showCustom(message?: string) {
      Toast({
        icon: 'user-filled',
        message,
      });
    },
    showLoading(message?: string) {
      Toast.loading(message);
    },
    showPosition(position: ToastPositionType) {
      Toast({
        type: 'success',
        position,
      });
    },
    showMask() {
      Toast({
        showOverlay: true,
        message: this.text1,
      });
    },
  },
});
</script>
<style lang="less" scoped>
.t-toast-base-demo {
  background: #fff;
  position: relative;
  height: 100vh;
}
.toast-wrap{
  .t-button:not(:last-child){
    margin-bottom: 12px;
  }
}
</style>
