<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Popup 弹窗层</h1>
    <p class="summary">由其他控件触发，屏幕滑出或弹出一块自定义内容区域</p>
    <tdesign-demo-block title="类型" summary="弹出层出现为止可能为顶部、底部、中部、左侧或右侧">
      <placementTop />
      <placementBottom />
      <placementLeft />
      <placementRight />
      <placementCenter />
      <customAnimation />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import customAnimation from './custom-animation.vue';
import placementTop from './placement-top.vue';
import placementBottom from './placement-bottom.vue';
import placementLeft from './placement-left.vue';
import placementRight from './placement-right.vue';
import placementCenter from './placement-center.vue';
</script>
