<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Image 图片</h1>
    <p class="summary">用于展示效果，主要为上下左右居中裁切、拉伸、平铺等方式。</p>
    <tdesign-demo-block title="01 类型" summary="裁切样式">
      <CropDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="圆角样式">
      <RoundedDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="加载中提示">
      <LoadingTipDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="加载失败提示">
      <LoadingErrorDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="常用图片尺寸"> <SizeDemo /> </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import CropDemo from './crop.vue';
import RoundedDemo from './rounded.vue';
import LoadingTipDemo from './loading-tip.vue';
import LoadingErrorDemo from './loading-error.vue';
import SizeDemo from './size.vue';
</script>
