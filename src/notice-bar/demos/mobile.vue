<template>
  <div class="noticebar-demo">
    <tdesign-demo-block title="01 类型" summary="静态消息公告栏">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标静态公告栏">
      <iconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带操作公告栏">
      <eventDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="滚动公告栏">
      <scrollDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义样式">
      <customDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态">
      <themeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 多行文字公告栏">
      <customizationDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import iconDemo from './icon.vue';
import eventDemo from './event.vue';
import scrollDemo from './scrolling.vue';
import customDemo from './custom.vue';
import themeDemo from './theme.vue';
import customizationDemo from './customization.vue';
</script>
