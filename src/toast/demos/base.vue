<template>
  <div :class="`${name}`">

    <t-cell-group title="文本轻提示">
      <t-cell value-align="left">
        <t-button size="large" @click="showText(text1)">短文本</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="showText(text2)">长文本</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="图标轻提示">
      <t-cell value-align="left">
        <t-button size="large" @click="showSuccess()">成功</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="showFail()">失败</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="showCustom()">自定义图标</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="图标加文本轻提示">
      <t-cell value-align="left">
        <t-button size="large" @click="showSuccess(success)">成功</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="showFail(fail)">失败</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="showLoading(loading)">加载</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="showCustom(custom)">自定义图标</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="提示位置">
      <t-cell value-align="left">
        <t-button size="large" @click="showPosition('top')">顶部Top</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="showPosition('middle')">中间Middle</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="showPosition('bottom')">底部Bottom</t-button>
      </t-cell>
    </t-cell-group>

    <t-cell-group title="z遮罩">
      <t-cell value-align="left">
        <t-button size="large" @click="showMask">带背景遮罩</t-button>
      </t-cell>
    </t-cell-group>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

import Toast from '../index';
import config from '@/config';
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
    showText(message: string | undefined) {
      Toast(message);
    },
    showSuccess(message: string | undefined) {
      Toast.success(message);
    },
    showFail(message: string | undefined) {
      Toast({
        type: 'fail',
        message,
      });
    },
    showCustom(message: string | undefined) {
      Toast({
        icon: 'user_fill',
        message,
      });
    },
    showLoading(message: string | undefined) {
      Toast.loading(message);
    },
    showPosition(position: string) {
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
</style>
