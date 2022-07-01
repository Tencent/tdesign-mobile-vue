<template>
  <div>
    <div class="tdesign-mobile-demo">
      <h1 class="title">Checkbox 多选框</h1>
      <p class="summary">描述文字</p>
      <tdesign-demo-block title="01 类型" summary="基础多选框">
        <BaseDemo />
      </tdesign-demo-block>
      <tdesign-demo-block summary="右侧圆形多选框">
        <RightDemo />
      </tdesign-demo-block>
      <tdesign-demo-block summary="带全选多选框">
        <GroupDemo />
      </tdesign-demo-block>
      <tdesign-demo-block summary="限制最多可选数量">
        <MaxDemo />
      </tdesign-demo-block>
      <tdesign-demo-block title="02 状态" summary="多选框禁用态">
        <DisableDemo />
      </tdesign-demo-block>
      <tdesign-demo-block summary="多选框半选态">
        <IndeterminateDemo />
      </tdesign-demo-block>
      <tdesign-demo-block title="03 特殊类型" summary="自定义图标多选框">
        <IconDemo />
      </tdesign-demo-block>
      <tdesign-demo-block title="04 规格" summary="多选框尺寸规格">
        <SizeDemo />
      </tdesign-demo-block>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import BaseDemo from './base.vue';
import GroupDemo from './group.vue';
import RightDemo from './right.vue';
import DisableDemo from './disable.vue';
import IndeterminateDemo from './indeterminate.vue';
import IconDemo from './icon.vue';
import MaxDemo from './max.vue';
import SizeDemo from './size.vue';
</script>
