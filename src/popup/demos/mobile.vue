<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Popup 弹窗层</h1>
    <p class="summary">由其他控件触发，屏幕滑出或弹出一块自定义内容区域</p>
    <tdesign-demo-block title="01 组件类型" summary="基础弹出层">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件示例" summary="应用示例">
      <withTitle />
      <customClose />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import withTitle from './with-title.vue';
import customClose from './custom-close.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  background-color: var(--bg-color-demo, #fff);
}
</style>
