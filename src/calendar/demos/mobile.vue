<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Calendar 日历</h1>
    <p class="summary">按钮用于选择日期。</p>

    <tdesign-demo-block title="01 基础" summary="基础用法">
      <div class="Calendar-demo">
        <BaseCalendarDemo />
        <rangeDemo />
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 自定义" summary=" ">
      <customTextDemo />
    </tdesign-demo-block>

    <!-- <tdesign-demo-block title="03 设置标题" summary="自定义标题">
      <div class="Calendar-demo">
        <HeadCalendarDemo />
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="04 设置单元格" summary="自定义单元格">
      <div class="Calendar-demo">
        <CellCalendarDemo />
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="04 设置背景颜色" summary="自定义单元格和按钮颜色">
      <div class="Calendar-demo">
        <ColorCalendarDemo />
      </div>
    </tdesign-demo-block> -->
  </div>
</template>
<script lang="ts" setup>
import BaseCalendarDemo from './base.vue';
import ValueCalendarDemo from './value.vue';
import HeadCalendarDemo from './head.vue';
import CellCalendarDemo from './cell.vue';
import ColorCalendarDemo from './color.vue';

import customTextDemo from './custom-text.vue';
import rangeDemo from './range.vue';
</script>
