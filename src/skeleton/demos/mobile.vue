<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Skeleton 骨架屏</h1>
    <p class="summary">用于等待加载内容所展示的占位图形组合，有动态效果加载效果，减少用户等待焦虑。</p>
    <tdesign-demo-block title="01 类型" :padding="true">
      <theme />
    </tdesign-demo-block>
    <tdesign-demo-block summary="单元格骨架屏" :padding="true">
      <cellGroup />
    </tdesign-demo-block>
    <tdesign-demo-block summary="宫格骨架屏" :padding="true">
      <grid />
    </tdesign-demo-block>
    <tdesign-demo-block summary="图文组合骨架屏" :padding="true">
      <imageGroup />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件动效" :padding="true">
      <animation />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import theme from './theme.vue';
import animation from './animation.vue';
import cellGroup from './cell-group.vue';
import grid from './grid.vue';
import imageGroup from './image-group.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: var(--bg-color-demo, #fff);
}
</style>
