<template>
  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 时分秒 </text>
    <div class="demo-count-down-content">
      <t-count-down size="small" :time="time" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down :time="time" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down size="large" :time="time" />
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 带毫秒 </text>
    <div class="demo-count-down-content">
      <t-count-down size="small" :time="time" millisecond />
    </div>
    <div class="demo-count-down-content">
      <t-count-down format="HH:mm:ss:SSS" :time="time" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down size="large" :time="time" millisecond />
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 带方形底 </text>
    <div class="demo-count-down-content">
      <t-count-down size="small" :time="time" theme="square" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down :time="time" theme="square" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down size="large" :time="time" theme="square" />
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 带圆形底 </text>
    <div class="demo-count-down-content">
      <t-count-down size="small" :time="time" theme="round" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down :time="time" theme="round" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down size="large" :time="time" theme="round" />
    </div>
  </div>

  <div class="demo-count-down">
    <text class="demo-count-down-desc"> 带单位 </text>
    <div class="demo-count-down-content">
      <t-count-down size="small" :time="time" split-with-unit theme="round" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down :time="time" split-with-unit theme="round" />
    </div>
    <div class="demo-count-down-content">
      <t-count-down size="large" :time="time" split-with-unit theme="round" />
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
