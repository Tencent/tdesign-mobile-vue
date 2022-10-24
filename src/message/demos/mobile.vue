<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Message 消息通知</h1>
    <p class="summary">用于页面消息通知提示，具有成功提示、提醒、警示等功能，通常在顶部出现，可以自动消失或点击关闭</p>
    <tdesign-demo-block title="01 类型" summary="弹窗内容为存文本、标题和副标题、带输入框">
      <!-- <functionDemo /> -->
      <baseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态" summary="弹窗内容为存文本、标题和副标题、带输入框">
      <themeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import themeDemo from './theme.vue';
import baseDemo from './base.vue';
</script>
