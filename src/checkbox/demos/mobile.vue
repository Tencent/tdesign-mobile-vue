<template>
  <div>
    <div class="tdesign-mobile-demo">
      <h1 class="title">Checkbox 多选框</h1>
      <p class="summary">用于预设的一组选项中执行多项选择，并呈现选择结果。</p>
      <tdesign-demo-block title="01 组件类型" summary="纵向多选框">
        <BaseDemo />
      </tdesign-demo-block>
      <tdesign-demo-block summary="横向多选框">
        <HorizontalDemo />
      </tdesign-demo-block>
      <tdesign-demo-block summary="带全选多选框">
        <AllDemo />
      </tdesign-demo-block>
      <tdesign-demo-block title="02 组件状态" summary="多选框状态">
        <StatusDemo />
      </tdesign-demo-block>
      <tdesign-demo-block title="03 组件样式" summary="勾选样式">
        <TypeDemo />
      </tdesign-demo-block>
      <tdesign-demo-block summary="勾选显示位置">
        <RightDemo />
      </tdesign-demo-block>
      <tdesign-demo-block summary="非通栏多选样式">
        <CardDemo />
      </tdesign-demo-block>
      <tdesign-demo-block title="04 组件规格" summary="多选框尺寸规格">
        <SpecialDemo />
      </tdesign-demo-block>
    </div>
  </div>
</template>
<script lang="ts" setup>
import BaseDemo from './base.vue';
import HorizontalDemo from './horizontal.vue';
import AllDemo from './all.vue';
import StatusDemo from './status.vue';
import TypeDemo from './type.vue';
import RightDemo from './right.vue';
import CardDemo from './card.vue';
import SpecialDemo from './special.vue';
</script>
