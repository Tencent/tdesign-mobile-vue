<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Image 图片</h1>
    <p class="summary">用于展示效果，主要为上下左右居中裁切、拉伸、平铺等方式。</p>
    <tdesign-demo-block title="01 类型" summary="裁切样式">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="加载中提示">
      <StatusDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 规格" summary="常用图片尺寸"> <SizeDemo /> </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import StatusDemo from './status.vue';
import SizeDemo from './size.vue';
</script>

<style lang="less" scoped>
.image-group {
  display: flex;
  padding: 0 16px;
  flex-wrap: wrap;
  margin-bottom: -10px;
  .image-demo {
    margin-bottom: 10px;
    margin-right: 7%;
    width: 72px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .image-container {
      width: 100%;
      height: 72px;
      .error-text-tip {
        font-size: 12px;
      }
    }
    .image-demo-tip {
      color: #646566;
      font-size: 14px;
      text-align: center;
      white-space: nowrap;
    }
  }
}
</style>
