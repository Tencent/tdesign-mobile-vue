<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Toast 轻提示</h1>
    <p class="summary">一种轻量级反馈或提示，不会打断用户操作。</p>
    <tdesign-demo-block title="01 类型" summary="基础提示">
      <textDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="默认提示">
      <iconTextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 展示位置和展示时间" summary="弹窗展示位置为顶部、中部、底部三种，展示时间可自定义">
      <positionDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 显示遮罩" summary="弹窗可显示遮罩，禁止滑动和点击">
      <preventScrollThroughDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 手动关闭" summary="手动关闭轻提示">
      <maskDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="05 透传 Overlay" summary="向 Overlay 遮罩透传属性">
      <overlayDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import textDemo from './text.vue';
import iconTextDemo from './iconText.vue';
import positionDemo from './position.vue';
import maskDemo from './mask.vue';
import preventScrollThroughDemo from './preventScrollThrough.vue';
import overlayDemo from './overlay.vue';
</script>
