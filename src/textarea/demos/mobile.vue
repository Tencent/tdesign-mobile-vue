<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Textarea 多行文本框</h1>
    <p class="summary">用于多行文本的输入</p>
    <tdesign-demo-block title="01 类型" summary="基础多行文本框">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带标题多行文本框">
      <autosizeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自动增高多行文本框">
      <eventsDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="禁用多行文本框">
      <labelDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 字符限制" summary="设置最大字符个数">
      <maxcharacterDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="设置最大字符个数，一个汉字表示两个字符">
      <maxlengthDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 事件" summary="带事件文本框">
      <statusDemo />
    </tdesign-demo-block>
  </div>
</template>
<script setup lang="ts">
import baseDemo from './base.vue';
import autosizeDemo from './autosize.vue';
import eventsDemo from './events.vue';
import labelDemo from './label.vue';
import maxcharacterDemo from './maxcharacter.vue';
import maxlengthDemo from './maxlength.vue';
import statusDemo from './status.vue';
</script>
