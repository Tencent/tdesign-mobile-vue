<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Link 链接</h1>
    <p class="summary">当功能使用图标即可表意清楚时，可使用纯图标悬浮按钮，例如：添加、发布。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础文字链接">
      <base-demo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="下划线文字链接">
      <underline-vue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="前置图标文字链接">
      <suffix-vue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="后置图标文字链接">
      <prefix-vue />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="不同主题">
      <theme-vue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="禁用状态">
      <status-vue />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件样式" summary="链接尺寸">
      <link-size-vue />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import statusVue from './status.vue';
import linkSizeVue from './linkSize.vue';
import prefixVue from './prefix.vue';
import suffixVue from './suffix.vue';
import themeVue from './theme.vue';
import underlineVue from './underline.vue';
</script>
