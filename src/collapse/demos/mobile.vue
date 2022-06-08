<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Collapse 折叠面板</h1>
    <p class="summary">在折叠面板中放入内容，点击面板的标题可以展开或收缩其内容。</p>
    <tdesign-demo-block header="01 类型" summary="基础折叠面板">
      <BaseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="基础折叠面板（多个）">
      <MoreDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="带操作说明">
      <ActionDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="手风琴模式">
      <AccordionDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import ActionDemo from './action.vue';
import AccordionDemo from './accordion.vue';
import MoreDemo from './more.vue';
</script>
