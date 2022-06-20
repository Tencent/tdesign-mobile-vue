<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Radio 单选框</h1>
    <p class="summary">用于在预设的一组选项中执行单项选择，并呈现选择结果。</p>
    <tdesign-demo-block title="01 类型" summary="左侧圆形单选框">
      <BaseDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="右侧圆形单选框">
      <RgightDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="左侧勾形单选框">
      <LeftStrokeLine />
    </tdesign-demo-block>

    <tdesign-demo-block summary="右侧勾形单选框">
      <RightStrovkeLine />
    </tdesign-demo-block>

    <tdesign-demo-block title="02 状态" summary="单选框禁用态">
      <StatusDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="03 特殊类型" summary="自定义图标多选框">
      <IconDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="04 规格" summary="单选框尺寸规格">
      <SizeDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import IconDemo from './icon.vue';
import SizeDemo from './size.vue';
import StatusDemo from './status.vue';
import RgightDemo from './right.vue';
import LeftStrokeLine from './leftStrokeLine.vue';
import RightStrovkeLine from './rightStrovkeLine.vue';
</script>
