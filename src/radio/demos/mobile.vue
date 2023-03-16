<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Radio 单选框</h1>
    <p class="summary">用于在预设的一组选项中执行单项选择，并呈现选择结果。</p>
    <tdesign-demo-block title="01 组件类型" summary="纵向单选框">
      <BaseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="横向单选框">
      <HorizontalDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件状态" summary="单选框禁用态">
      <StatusDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 组件样式" summary="勾选样式">
      <IconDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="勾选显示位置">
      <PlacementVue />
    </tdesign-demo-block>

    <tdesign-demo-block summary="非通栏单选样式">
      <CardDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="04 特殊样式" summary="单选框尺寸规格">
      <CustomVue />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import HorizontalDemo from './horizontal.vue';
import IconDemo from './icon.vue';
import StatusDemo from './status.vue';
import PlacementVue from './placement.vue';
import CardDemo from './card.vue';
import CustomVue from './custom.vue';
</script>
