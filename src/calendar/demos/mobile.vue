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
      <tdesign-demo-block summary="带单行描述的日历">
        <div class="Calendar-demo">
          <customTextSingel />
        </div>
      </tdesign-demo-block>

      <tdesign-demo-block summary="带双行描述的日历">
        <div class="Calendar-demo">
          <customTextDemo />
        </div>
      </tdesign-demo-block>

      <tdesign-demo-block summary="带翻页功能的日历">
        <div class="Calendar-demo">
          <SwitchModeDemo />
        </div>
      </tdesign-demo-block>

      <tdesign-demo-block summary="可选择区间日期的日历">
        <div class="Calendar-demo">
          <rangeDemo />
        </div>
      </tdesign-demo-block>
    </tdesign-demo-block>

    <tdesign-demo-block title="02 组件样式" summary="">
      <tdesign-demo-block summary="国际化">
        <div class="Calendar-demo">
          <international />
        </div>
      </tdesign-demo-block>

      <tdesign-demo-block summary="含不可选的日历">
        <div class="Calendar-demo">
          <cannotChoose />
        </div>
      </tdesign-demo-block>
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
import customTextSingel from './custom-text-singel.vue';
import international from './international.vue';
import cannotChoose from './cannot-choose.vue';
</script>

<style scoped>
.Calendar-demo {
  margin-bottom: 16px;
}
</style>
