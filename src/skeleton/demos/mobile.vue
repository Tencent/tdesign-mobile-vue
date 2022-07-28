<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Skeleton 骨架屏</h1>
    <p class="summary">当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。</p>
    <tdesign-demo-block title="01 类型"></tdesign-demo-block>
    <tdesign-demo-block v-for="(item, index) in themeList" :key="index" :summary="item.title">
      <div class="skeleton-demo">
        <Base :theme="item.value" :loading="item.loading" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="宫格骨架屏">
      <div class="skeleton-demo">
        <Grid loading />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="单元格骨架屏">
      <div class="skeleton-demo">
        <AvatarText loading />
      </div>
      <div class="skeleton-demo">
        <PicText loading />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图片组合骨架屏">
      <div class="skeleton-demo">
        <ImageGroup loading />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 动画" summary="渐变加载动画">
      <div class="skeleton-demo">
        <Gradient loading />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="闪烁加载动画">
      <div class="skeleton-demo">
        <Flashed loading />
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import Base from './base.vue';
import AvatarText from './avatar-text.vue';
import PicText from './pic-text.vue';
import ImageGroup from './image-group.vue';
import Flashed from './flashed.vue';
import Gradient from './gradient.vue';
import Grid from './grid.vue';

const themeList = [
  {
    title: '头像骨架屏',
    value: 'avatar',
    loading: true,
  },
  {
    title: '图片骨架屏',
    value: 'image',
    loading: true,
  },
  {
    title: '文本骨架屏',
    value: 'text',
    loading: true,
  },
  {
    title: '段落骨架屏',
    value: 'paragraph',
    loading: true,
  },
];
</script>
<style scoped lang="less">
.skeleton-demo {
  margin: 0 16px;
}
</style>
