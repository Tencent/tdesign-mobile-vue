<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Slider 滑动选择器</h1>
    <p class="summary">用于选择横轴上的数值、区间、档位</p>
    <tdesign-demo-block title="01 类型" summary="单游标滑块">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="双游标滑块">
      <rangeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带数值单游标/双游标滑块">
      <labelDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带刻度单游标/双游标滑块">
      <stepDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="滑块禁用状态">
      <disableDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 特殊样式" summary="胶囊型滑块">
      <capsuleDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="04 垂直状态">
      <verticalDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import rangeDemo from './range.vue';
import labelDemo from './label.vue';
import stepDemo from './step.vue';
import disableDemo from './disabled.vue';
import capsuleDemo from './capsule.vue';
import verticalDemo from './vertical.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  background: #f6f6f6;
}
</style>
