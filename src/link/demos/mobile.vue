<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Link 链接</h1>
    <p class="summary">当功能使用图标即可表意清楚时，可使用纯图标悬浮按钮，例如：添加、发布。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础文字链接">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="下划线文字链接">
      <underline />
    </tdesign-demo-block>
    <tdesign-demo-block summary="前置图标文字链接">
      <suffix />
    </tdesign-demo-block>
    <tdesign-demo-block summary="后置图标文字链接">
      <prefix />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="不同主题">
      <theme />
    </tdesign-demo-block>
    <tdesign-demo-block summary="禁用状态">
      <disabled />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件样式" summary="链接尺寸">
      <linkSize />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import disabled from './disabled.vue';
import linkSize from './linkSize.vue';
import prefix from './prefix.vue';
import suffix from './suffix.vue';
import theme from './theme.vue';
import underline from './underline.vue';
</script>
