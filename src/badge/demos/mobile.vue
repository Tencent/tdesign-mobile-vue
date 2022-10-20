<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Badge 徽标</h1>
    <p class="summary">用于告知用户，该区域的状态变化或者待处理任务的数量。</p>
    <tdesign-demo-block title="01 小红点" summary="">
      <DistDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 数字型" summary="">
      <MaxCountDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 文字型" summary="">
      <TextDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 角标" summary="">
      <ShapeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="05 颜色" summary="">
      <ColorDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="06 偏移用法" summary="">
      <OffsetDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import DistDemo from './dist.vue';
import MaxCountDemo from './max-count.vue';
import TextDemo from './text.vue';
import ShapeDemo from './shape.vue';
import ColorDemo from './color.vue';
import OffsetDemo from './offset.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  padding: 0 10px;
}
</style>
