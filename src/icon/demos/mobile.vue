<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Icon 图标</h1>
    <p class="summary">Icon 作为UI构成中重要的元素，一定程度上影响UI界面整体呈现出的风格。</p>
    <tdesign-demo-block title="SVG 全量引入" :padding="true">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="SVG 按需引入" :padding="true">
      <single />
    </tdesign-demo-block>
    <tdesign-demo-block title="SVG 高级用法" :padding="true">
      <enhanced />
    </tdesign-demo-block>
    <tdesign-demo-block title="iconfont 图标" :padding="true">
      <iconfont />
    </tdesign-demo-block>
    <tdesign-demo-block title="iconfont 高级用法" :padding="true">
      <iconfontEnhanced />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import enhanced from './enhanced.vue';
import iconfontEnhanced from './iconfont-enhanced.vue';
import iconfont from './iconfont.vue';
import single from './single.vue';
</script>

<style lang="less">
.t-demo-iconfont {
  .t-icon,
  .cps-icon {
    margin-right: 24px;
  }
}

:root[theme-mode='dark'] {
  .tdesign-mobile-demo {
    color: var(--td-text-color-primary);
  }
}
</style>
