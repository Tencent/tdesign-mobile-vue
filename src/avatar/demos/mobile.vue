<template>
  <div class="tdesign-mobile-demo" style="background-color: #fff">
    <h1 class="title">Avatar 头像</h1>
    <p class="summary">用于展示用户头像信息，除了纯展示也可点击进入个人详情等操作。</p>
    <tdesign-demo-block title="01 头像类型" summary="头像样式可为默认头像、微信头像圆形、方形、自定义文字">
      <shapeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 特殊类型" summary="纯展示 从上往下">
      <exhibitionDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作 从下往上">
      <actionDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="头像大小尺寸">
      <sizeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import shapeDemo from './shape.vue';
import sizeDemo from './size.vue';
import exhibitionDemo from './exhibition.vue';
import actionDemo from './action.vue';
</script>
