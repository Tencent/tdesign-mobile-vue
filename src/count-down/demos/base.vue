<template>
  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 时分秒</text>
    <div class="demo-count-down-content">
      <t-count-down :time="time" />
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 带毫秒</text>
    <div class="demo-count-down-content">
      <t-count-down :time="time" millisecond />
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 带方形底</text>
    <div class="demo-count-down-content">
      <t-count-down :time="time" content="default" theme="square"></t-count-down>
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 带圆形底</text>
    <div class="demo-count-down-content">
      <t-count-down :time="time" theme="round"></t-count-down>
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 带单位</text>
    <div class="demo-count-down-content">
      <t-count-down :time="time" split-with-unit theme="round" />
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 无底色带单位</text>
    <div class="demo-count-down-content">
      <t-count-down :time="time" class="custom" split-with-unit />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface TimeData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

const time = 96 * 60 * 1000;
</script>

<style lang="less">
@import '../../_common/style/mobile/_variables';

.demo-count-down-desc {
  color: var(--td-text-color-secondary, rgba(0, 0, 0, 0.6));
  font-size: 14px;
}

.demo-count-down-content {
  margin: 16px 0 24px;
}

// 覆盖组件内部样式
.custom .t-count-down__item {
  color: @error-color;
  font-size: 18px;
  line-height: 24px;
  vertical-align: middle;
}

.custom .t-count-down__split {
  font-size: 10px;
  margin: 0 5px;
}
</style>
