<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Cascader 级联选择器</h1>
    <p class="summary">用于多层级数据选择，主要为树形结构，可展示更多的数据</p>
    <tdesign-demo-block title="01 基础" summary="基本用法">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="选项卡风格">
      <themeTabDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 进阶" summary="带初始值">
      <withValueDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义 keys">
      <keysDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="使用次级标题">
      <withTitleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="异步加载">
      <lazyDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="选择任意一项">
      <checkStrictlyDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import baseDemo from './base.vue';
import themeTabDemo from './theme-tab.vue';
import keysDemo from './keys.vue';
import withValueDemo from './with-value.vue';
import withTitleDemo from './with-title.vue';
import lazyDemo from './lazy.vue';
import checkStrictlyDemo from './check-strictly.vue';
</script>
