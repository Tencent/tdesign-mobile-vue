<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Slider 滑动选择器</h1>
    <p class="summary">滑动滑块来选择一个数值，在具体场景中也可以增加来刻度和展示数值来方便用户使用</p>
    <tdesign-demo-block title="01 类型" summary="基础滑动选择器">
      <div class="slider-demo">
        <BaseDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带数值滑动选择器">
      <div class="slider-demo">
        <t-slider v-model="value1" disabled />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="起始非零滑动选择器">
      <div class="slider-demo">
        <t-slider :default-value="30" :min="30" show-extreme-value> </t-slider>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带刻度滑动选择器">
      <div class="slider-demo">
        <t-slider v-model="value2" disabled :marks="marks"> </t-slider>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="区间滑动选择器">
      <div class="slider-demo">
        <t-slider v-model="rangeValue" show-value range @change="onChange"> </t-slider>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseDemo from './base.vue';

const value = ref(60);
const value1 = ref(60);
const value2 = ref(50);
const marks = ref({ 0: '小', 50: '中', 100: '大' });
const rangeValue = ref([30, 70]);

function onChange($event: number | number[]) {
  console.log(`change to ${$event}`);
}
</script>

<style scoped>
.tdesign-mobile-demo {
  background: #fff;
}
</style>
