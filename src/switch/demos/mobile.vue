<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Switch 开关</h1>
    <p class="summary">用于控制某个功能的开启和关闭。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础开关">
      <baseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="带描述开关">
      <labelDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="自定义颜色开关">
      <colorDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件状态" summary="加载状态">
      <statusDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式" summary="开关尺寸">
      <sizeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import colorDemo from './color.vue';
import labelDemo from './label.vue';
import statusDemo from './status.vue';
import sizeDemo from './size.vue';
</script>
