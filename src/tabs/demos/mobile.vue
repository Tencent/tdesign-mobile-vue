<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Tabs 选项卡</h1>
    <p class="summary">用于内容分类后的展示切换。</p>
    <tdesign-demo-block title="01 组件类型" summary="均分选项卡">
      <evenlyDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="等距选项卡">
      <isometricDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图标选项卡">
      <iconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带徽标选项卡">
      <badgeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带内容区选项卡">
      <contentDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="选项卡状态">
      <statusDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件样式" summary="选项卡尺寸">
      <sizeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="选项卡样式">
      <themeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import evenlyDemo from './evenly.vue';
import isometricDemo from './isometric.vue';
import iconDemo from './icon.vue';
import badgeDemo from './badge.vue';
import contentDemo from './content.vue';
import statusDemo from './status.vue';
import themeDemo from './theme.vue';
import sizeDemo from './size.vue';
</script>
