<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Segmented 分段控制器</h1>
    <p class="summary">用于切换不同的内容区域，一次只显示一个区域的内容。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础">
      <base-demo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自适应宽度">
      <block-demo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="控制器禁用态">
      <disabled-demo />
    </tdesign-demo-block>
  </div>
</template>

<script setup lang="ts">
import BaseDemo from './base.vue';
import BlockDemo from './block.vue';
import DisabledDemo from './disabled.vue';
</script>
