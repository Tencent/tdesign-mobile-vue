<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Popover 弹出气泡</h1>
    <p class="summary">用于文字提示的气泡框。</p>
    <tdesign-demo-block title="01 组件类型">
      <typeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式">
      <themeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block>
      <placementDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import typeDemo from './type.vue';
import themeDemo from './theme.vue';
import placementDemo from './placement.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
