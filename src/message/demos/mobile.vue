<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Message 消息通知</h1>
    <p class="summary" style="margin: 8px 16px 0">用于轻量级反馈或提示，不会打断用户操作。</p>
    <tdesign-demo-block title="01 组件类型" summary="消息通知内容为文本、带操作按钮">
      <baseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件风格" summary="消息组件风格">
      <themeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import themeDemo from './theme.vue';
import baseDemo from './base.vue';
</script>

<style lang="less">
.tdesign-demo-main {
  position: fixed;
  transform: translate(0, 0);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tdesign-mobile-demo {
  position: fixed;
  width: 100%;
  height: calc(100% - 78px);
  overflow: scroll;
}
</style>
