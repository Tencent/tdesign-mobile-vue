<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Steps 步骤条</h1>
    <p class="summary">用于任务步骤展示或任务进度展示。</p>
    <tdesign-demo-block title="01 类型" summary="横向可操作步骤条">
      <ClickDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="横向带图标可操作步骤条">
      <IconDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="横向只读步骤条">
      <HorizontalDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="竖向只读步骤条">
      <VerticalReadonlyDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="竖向简化只读步骤条">
      <VerticalDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义内容步骤条">
      <ContentDemo />
    </tdesign-demo-block>
  </div>
</template>
<script setup lang="ts">
import ClickDemo from './click.vue';
import IconDemo from './icon.vue';
import HorizontalDemo from './horizontal.vue';
import VerticalReadonlyDemo from './vertical-readonly.vue';
import VerticalDemo from './vertical.vue';
import ContentDemo from './content.vue';
</script>
