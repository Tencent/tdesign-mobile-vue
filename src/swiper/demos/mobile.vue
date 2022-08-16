<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Swiper 轮播</h1>
    <p class="summary">用于循环轮播一组图片或内容，也可以滑动进行切换，轮播动效时间可以设置</p>
    <tdesign-demo-block title="01 类型" summary="轮播图的多种样式">
      <div style="padding: 0 16px">
        <baseDemo />
        <directionDemo />
        <navigationTypeDemo />
        <controlledDemo />

        <!-- no loop -->
        <noLoopDemo />
      </div>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import baseDemo from './base.vue';
import noLoopDemo from './no-loop.vue';
import directionDemo from './direction.vue';
import navigationTypeDemo from './navigation-type.vue';
import controlledDemo from './controlled.vue';
</script>

<style lang="less">
.t-swiper {
  margin-bottom: 24px;
}
</style>
