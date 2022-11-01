<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Input 输入框</h1>
    <p class="summary">空状态时的占位提示。</p>
    <tdesign-demo-block title="01 类型">
      <typeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="文本框状态">
      <statusDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 特殊类型" summary="特殊文本框类型">
      <specialDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 规格" summary="文本框尺寸规格">
      <sizeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="05 内容位置" summary="文本框内容位置">
      <alignDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="06 字数限制" summary="文本框字数限制">
      <limitDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import typeDemo from './type.vue';
import statusDemo from './status.vue';
import specialDemo from './special.vue';
import sizeDemo from './size.vue';
import alignDemo from './align.vue';
import limitDemo from './limit.vue';
</script>
