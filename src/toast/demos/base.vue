<template>
  <div :class="`${name}`">
    <t-cell-group title="文本轻提示">
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 0">短文本</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 1">长文本</t-button>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="图标轻提示">
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 2">成功</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 3">警告</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 4">自定义图标</t-button>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="文本加图标轻提示">
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 5">成功</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 6">警告</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 7">加载</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 8">自定义图标</t-button>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="提示位置">
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 9">顶部Top</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 10">中间Middle</t-button>
      </t-cell>
      <t-cell value-align="left">
        <t-button size="large" @click="cur= 11">底部Bottom</t-button>
      </t-cell>
    </t-cell-group>
    <t-toast v-show="cur== 0" theme="text">轻提示内容</t-toast>
    <t-toast v-show="cur== 1" theme="text">
      这是一条很长的轻提示内容，这是一条很长的轻提示内容
    </t-toast>
    <t-toast icon="tick"  theme="success" iconOnly="true" v-show="cur==2" ></t-toast>
    <t-toast icon="error" theme="fail" iconOnly="true" v-show="cur==3" ></t-toast>
    <t-toast icon="clear" iconOnly="true" v-show="cur==4" ></t-toast>

    <t-toast icon="tick"  theme="success"  v-show="cur==5" >成功文案</t-toast>
    <t-toast icon="error"  theme="fail" v-show="cur==6" >失败文案</t-toast>
    <t-toast icon="loading_gradient" theme="loading"
             v-show="cur==7" >失败文案</t-toast>
    <t-toast icon="clear"  v-show="cur==8" >提示文案</t-toast>
    <t-toast theme="text" position="top" v-show="cur==9" >提示文案</t-toast>
    <t-toast theme="text" position="middle" v-show="cur==10" >提示文案</t-toast>
    <t-toast theme="text" position="bottom" v-show="cur==11" >提示文案</t-toast>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-toast-base-demo`;
export default {
  setup() {
    return {
      name: ref(name),
      cur: 0,
    };
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
