<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Swiper 轮播</h1>
    <p class="summary">用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置。</p>
    <tdesign-demo-block title="01 组件类型" summary="点状（dots）">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="条状（dots-bar）">
      <custom />
    </tdesign-demo-block>
    <tdesign-demo-block summary="分式（fraction）">
      <fraction />
    </tdesign-demo-block>
    <tdesign-demo-block summary="切换按钮（controls）">
      <control />
    </tdesign-demo-block>
    <!-- <tdesign-demo-block summary="卡片模式">
      <card />
    </tdesign-demo-block> -->
    <tdesign-demo-block title="02 组件样式" summary="垂直模式">
      <vertical />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import baseDemo from './base.vue';
import custom from './custom.vue';
import fraction from './fraction.vue';
import control from './control.vue';
import card from './card.vue';
import vertical from './vertical.vue';
</script>

<style lang="less">
html,
body {
  background-color: #fff;
}
.tdesign-mobile-demo {
  background-color: #fff;
}
.t-swiper {
  margin-bottom: 24px;
}
</style>
