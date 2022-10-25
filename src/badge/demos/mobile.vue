<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Badge 徽标</h1>
    <p class="summary">用于告知用户，该区域的状态变化或者待处理任务的数量。</p>
    <tdesign-demo-block title="01 普通徽标" summary="">
      <NormalDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 按钮徽标" summary="">
      <ButtonDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 单行徽标" summary="">
      <SingleLineDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import NormalDemo from './normal.vue';
import ButtonDemo from './button.vue';
import SingleLineDemo from './single-line.vue';
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  padding: 0 10px 10px;
}
</style>
