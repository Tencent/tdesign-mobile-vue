<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Toast 轻提示</h1>
    <p class="summary">一种轻量级反馈或提示，不会打断用户操作。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础提示">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="内置主题">
      <themeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 显示遮罩" summary="弹窗可显示遮罩，禁止滑动和点击">
      <coverDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 手动关闭" summary="手动关闭轻提示">
      <closeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import themeDemo from './theme.vue';
import coverDemo from './cover.vue';
import closeDemo from './close.vue';
</script>
