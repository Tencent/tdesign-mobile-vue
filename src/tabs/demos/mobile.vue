<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Tabs 选项卡</h1>
    <p class="summary">用作一组平行关系页面/内容的切换器</p>
    <tdesign-demo-block title="01 类型" summary="横向选项卡">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="超过屏幕滑动">
      <scrollDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="无下划线">
      <underscoreDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="运动时间可调整">
      <animationDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="选项卡状态">
      <disabledDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 特殊类型" summary="竖向选项卡">
      <verticalDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="选中态文字尺寸规格">
      <sizeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import scrollDemo from './scroll.vue';
import underscoreDemo from './underscore.vue';
import animationDemo from './animation.vue';
import disabledDemo from './disabled.vue';
import verticalDemo from './vertical.vue';
import sizeDemo from './size.vue';
</script>
