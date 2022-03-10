<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">BackTop 回到顶部</h1>
    <p class="summary">用于当页面过长往下滑动时，帮助用户快速回到页面顶部</p>
    <t-back-top v-show="showBackTop" :theme="theme" :text="text" />
    <t-back-top v-show="showBackTop2" text="顶部">
      <template #icon>
        <div></div>
      </template>
    </t-back-top>
    <t-back-top v-show="showBackTop3" text="顶部" />
    <t-back-top v-show="showBackTop4" :target="myDOMTarget" text="target" />
    <tdesign-demo-block
      title="01 类型"
      summary="通过设置theme属性，可以分别展示圆+白、半圆+白、圆+黑、半圆+黑四种样式类型"
    >
      <div class="button-group">
        <t-button data-index="0" @click="onBtnClick">圆角白底</t-button>
        <t-button data-index="1" @click="onBtnClick">圆角黑底</t-button>
        <t-button data-index="2" @click="onBtnClick">半圆白底</t-button>
        <t-button data-index="3" @click="onBtnClick">半圆黑底</t-button>
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 内容" summary="通过设置text、icon属性，可以控制悬浮按钮的展示内容">
      <div class="button-group">
        <t-button data-index="4" @click="onBtnClick">纯图标</t-button>
        <t-button @click="onBtnClick2">纯文字</t-button>
        <t-button @click="onBtnClick3">自定义图标</t-button>
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="03 返回" summary="通过设置target属性，可以控制页面滚动到对应的DOM元素">
      <div ref="myDOM" class="button-group">
        <t-button @click="onBtnClick4">回到此按钮</t-button>
      </div>
    </tdesign-demo-block>

    <div class="blank"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, toRefs } from 'vue';
import config from '@/config';

const { prefix } = config;
const name = `${prefix}-back-top`;
const backTopDemos = [
  { text: '顶部', theme: 'round' },
  { text: '顶部', theme: 'round-dark' },
  { text: '返回顶部', theme: 'half-round' },
  { text: '返回顶部', theme: 'half-round-dark' },
  { text: '', theme: 'round' },
];
export default defineComponent({
  setup() {
    const showBackTop = ref(false);
    const showBackTop2 = ref(false);
    const showBackTop3 = ref(false);
    const showBackTop4 = ref(false);
    const myDOM = ref(null);
    const text = ref(backTopDemos[0].text);
    const theme = ref(backTopDemos[0].theme);
    const onBtnClick = (e: any) => {
      text.value = backTopDemos[e.currentTarget.dataset.index].text;
      theme.value = backTopDemos[e.currentTarget.dataset.index].theme;
      showBackTop2.value = false;
      showBackTop3.value = false;
      showBackTop4.value = false;
      showBackTop.value = true;
      window.scrollTo(0, 1200);
    };

    const onBtnClick2 = () => {
      showBackTop.value = false;
      showBackTop2.value = true;
      showBackTop3.value = false;
      showBackTop4.value = false;
      window.scrollTo(0, 1200);
    };

    const onBtnClick3 = () => {
      showBackTop.value = false;
      showBackTop2.value = false;
      showBackTop3.value = true;
      showBackTop4.value = false;
      window.scrollTo(0, 1200);
    };

    const onBtnClick4 = () => {
      showBackTop.value = false;
      showBackTop2.value = false;
      showBackTop3.value = false;
      showBackTop4.value = true;
      window.scrollTo(0, 1200);
    };

    const myDOMTarget = () => myDOM.value;
    return {
      name,
      myDOM,
      text,
      theme,
      showBackTop,
      showBackTop2,
      showBackTop3,
      showBackTop4,
      onBtnClick,
      onBtnClick2,
      onBtnClick3,
      onBtnClick4,
      myDOMTarget,
    };
  },
});
</script>

<style lang="less" scoped>
.button-group {
  padding: 8px 16px 16px;
  display: flex;
  flex-wrap: wrap;
  button {
    width: 100px;
    margin-right: 20px;
    margin-bottom: 10px;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.blank {
  height: 800px;
}
</style>
