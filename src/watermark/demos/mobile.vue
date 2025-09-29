<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Watermark水印</h1>
    <p class="summary">给页面的某个区域加上水印。</p>
    <tdesign-demo-block title="01 单行文本水印">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 图片水印">
      <ImageDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 多行文本水印">
      <MultilineDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 运动文字水印">
      <MovingTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="05 运动图片水印">
      <MovingImageDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="06 图片灰阶水印">
      <GrayLevelDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="07 不同布局的水印" summary="横平竖直的水印">
      <LayoutRectangularDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="错位的水印">
      <LayoutHexagonalDemo />
    </tdesign-demo-block>
  </div>
</template>
<script setup lang="ts">
import BaseDemo from './base.vue';
import ImageDemo from './image.vue';
import MultilineDemo from './multiline.vue';
import MovingTextDemo from './movingText.vue';
import MovingImageDemo from './movingImage.vue';
import GrayLevelDemo from './graylevel.vue';
import LayoutRectangularDemo from './layoutRectangular.vue';
import LayoutHexagonalDemo from './layoutHexagonal.vue';
</script>
