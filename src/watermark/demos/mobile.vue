<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Watermark 水印</h1>
    <p class="summary">给页面的某个区域加上水印。</p>
    <tdesign-demo-block title="01 组件类型" summary="文本水印">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="图片水印">
      <ImageDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="图片灰阶水印">
      <GrayDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多行图文水印">
      <MultiLineDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="多行图文灰阶水印">
      <MultiLineGrayDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="运动文字水印">
      <MovingTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="运动图片水印">
      <MovingImageDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式">
      <Layout />
    </tdesign-demo-block>
  </div>
</template>
<script setup lang="ts">
import BaseDemo from './base.vue';
import ImageDemo from './image.vue';
import MultiLineDemo from './multiLine.vue';
import MultiLineGrayDemo from './multiLineGray.vue';
import MovingTextDemo from './movingText.vue';
import MovingImageDemo from './movingImage.vue';
import GrayDemo from './gray.vue';
import Layout from './layout.vue';
</script>
