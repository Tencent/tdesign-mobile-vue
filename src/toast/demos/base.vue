<template>
  <div :class="`${name}`">

    <t-cell-group title="文本轻提示">
      <t-cell value-align="left">
        <t-button size="large" @click="$toast(text1)">短文本</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="$toast(text2)">长文本</t-button>
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

    <t-cell-group title="文本加图标轻提示">
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

    <!-- <t-toast v-show="cur== 0" theme="text">轻提示内容</t-toast>
    <t-toast v-show="cur== 1" theme="text">
      这是一条很长的轻提示内容，这是一条很长的轻提示内容
    </t-toast>

    <t-toast icon="tick" theme="success" v-show="cur==2" ></t-toast>
    <t-toast icon="error" class="t-toast--icononly" theme="fail" v-show="cur==3" ></t-toast>
    <t-toast icon="clear" class="t-toast--icononly" v-show="cur==4" ></t-toast>

    <t-toast icon="tick"  theme="success"  v-show="cur==5" >成功文案</t-toast>
    <t-toast icon="error" theme="fail" v-show="cur==6" >失败文案</t-toast>
    <t-toast icon="loading_gradient" theme="loading"
             v-show="cur==7" >提示文案</t-toast>
    <t-toast icon="clear"  v-show="cur==8" >提示文案</t-toast>
    <t-toast theme="text" position="top" v-show="cur==9" >提示文案</t-toast>
    <t-toast theme="text" position="middle" v-show="cur==10" >提示文案</t-toast>
    <t-toast theme="text" position="bottom" v-show="cur==11" >提示文案</t-toast>

    <t-mask  v-show="cur==12"/>
    <t-toast icon="tick"  theme="success"  v-show="cur==12" >提示文案</t-toast> -->
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

import Toast from '../index';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-toast-base-demo`;
export default {
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
    $toast: Toast,
    showTextToast() {
      console.log(Toast);
    },
    showSuccess(message: string | undefined) {
      // this.$toast({
      //   type: 'success',
      //   message,
      // });
      Toast.success(message);
    },
    showFail(message: string | undefined) {
      this.$toast({
        type: 'fail',
        message,
      });
    },
    showCustom(message: string | undefined) {
      this.$toast({
        icon: 'books',
        message,
        duration: 100000,
      });
    },
    showLoading(message: string | undefined) {
      // this.$toast({
      //   type: 'loading',
      //   message,
      // });
      const ins = Toast.loading(message);
      console.log(ins);
    },
    showPosition(position: string) {
      this.$toast({
        type: 'success',
        position,
      });
    },
    showMask() {
      this.$toast({
        showOverlay: true,
        message: this.text1,
        duration: 10000,
      });
      setTimeout(() => {
        Toast.clear();
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.t-toast-base-demo {
  background: #fff;
  position: relative;
  height: 100vh;
}
</style>
