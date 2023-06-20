<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Image 图片</h1>
    <p class="summary">用于展示图片素材。</p>
    <tdesign-demo-block title="01 组件类型" :padding="true">
      <BaseDemo />
      <PositionDemo />
      <ShapeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态">
      <StatusDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import PositionDemo from './position.vue';
import ShapeDemo from './shape.vue';
import StatusDemo from './status.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
