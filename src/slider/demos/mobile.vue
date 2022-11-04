<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Slider 滑动选择器</h1>
    <p class="summary">用于选择横轴上的数值、区间、档位</p>
    <tdesign-demo-block title="01 类型" summary="基础滑动选择器">
      <div class="slider-demo">
        <BaseDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带数值滑动选择器">
      <div class="slider-demo">
        <ValueDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="起始非零滑动选择器">
      <div class="slider-demo">
        <UnZeroDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带刻度滑动选择器">
      <div class="slider-demo">
        <MarkDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="区间滑动选择器">
      <div class="slider-demo">
        <RangeDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="滑动选择器禁用状态">
      <div class="slider-demo">
        <DisableDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="无标题滑动选择器">
      <div class="slider-demo">
        <BaseDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="有标题滑动选择器">
      <div class="slider-demo">
        <TitleDemo />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import BaseDemo from './base.vue';
import MarkDemo from './mark.vue';
import ValueDemo from './value.vue';
import RangeDemo from './range.vue';
import DisableDemo from './disable.vue';
import UnZeroDemo from './unZero.vue';
import TitleDemo from './title.vue';
</script>

<style scoped>
.tdesign-mobile-demo {
  background: #fff;
}
</style>
