<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Message 消息通知</h1>
    <p class="summary" style="margin: 8px 16px 0">用于轻量级反馈或提示，不会打断用户操作。</p>
    <tdesign-demo-block title="01 组件类型" summary="消息通知内容为文本、带操作按钮" :padding="true">
      <baseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件风格" summary="消息组件风格" :padding="true">
      <themeDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 关闭所有通知" summary="关闭所有通知" :padding="true">
      <closeAllDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import themeDemo from './theme.vue';
import baseDemo from './base.vue';
import closeAllDemo from './closeAll.vue';
</script>
