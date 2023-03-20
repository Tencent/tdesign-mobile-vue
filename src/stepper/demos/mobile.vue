<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Stepper 步进器</h1>
    <p class="summary">用于数量的增减。</p>
    <tdesign-demo-block title="01 类型" summary="基础步进器">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="最大最小状态">
      <minMax />
    </tdesign-demo-block>
    <tdesign-demo-block summary="禁用状态">
      <statusDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件样式" summary="步进器样式">
      <themeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="步进器尺寸">
      <sizeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import minMax from './min-max.vue';
import statusDemo from './status.vue';
import themeDemo from './theme.vue';
import sizeDemo from './size.vue';
</script>
