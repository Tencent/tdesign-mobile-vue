<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Calendar 日历</h1>
    <p class="summary">按照日历形式展示数据或日期的容器</p>

    <tdesign-demo-block title="01 组件类型" summary="基础日历">
      <div class="Calendar-demo">
        <BaseCalendarDemo />
      </div>

      <div class="Calendar-demo">
        <multipleVue />
      </div>

      <div class="Calendar-demo">
        <rangeDemo />
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件样式" summary="可以自由定义想要的风格">
      <div class="Calendar-demo">
        <customTextDemo />
      </div>

      <div class="Calendar-demo">
        <customButtonVue />
      </div>

      <div class="Calendar-demo">
        <customRangeVue />
      </div>

      <div class="Calendar-demo">
        <SwitchModeDemo />
      </div>
    </tdesign-demo-block>

    <tdesign-demo-block summary="不使用 Popup">
      <withoutPopup />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import BaseCalendarDemo from './base.vue';
import multipleVue from './multiple.vue';
import customTextDemo from './custom-text.vue';
import rangeDemo from './range.vue';
import customButtonVue from './custom-button.vue';
import customRangeVue from './custom-range.vue';
import withoutPopup from './without-popup.vue';
import SwitchModeDemo from './switch-mode.vue';
</script>

<style scoped>
.Calendar-demo {
  margin-bottom: 16px;
}
</style>
