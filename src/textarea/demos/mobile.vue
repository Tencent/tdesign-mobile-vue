<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Textarea 多行文本框</h1>
    <p class="summary">用于多行文本的输入</p>
    <tdesign-demo-block title="01 组件类型" summary="基础多行文本框">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带标题多行文本框">
      <labelDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自动增高多行文本框">
      <autosizeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="设置字符数限制">
      <maxlengthDemo />
    </tdesign-demo-block>
    <tdesign-demo-block>
      <maxcharacterDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="禁用状态">
      <disableDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 组件样式" summary="卡片样式">
      <cardDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 特殊样式" summary="标签外置输入框">
      <customDemo />
    </tdesign-demo-block>
  </div>
</template>
<script setup lang="ts">
import baseDemo from './base.vue';
import autosizeDemo from './autosize.vue';
import labelDemo from './label.vue';
import maxcharacterDemo from './maxcharacter.vue';
import maxlengthDemo from './maxlength.vue';
import disableDemo from './disabled.vue';
import cardDemo from './card.vue';
import customDemo from './custom.vue';
</script>
