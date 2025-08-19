<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Calendar 日历</h1>
    <p class="summary">按照日历形式展示数据或日期的容器</p>

    <tdesign-demo-block title="01 组件类型" summary="基础日历">
      <div class="Calendar-demo">
        <BaseDemo />
      </div>

      <div class="Calendar-demo">
        <multipleDemo />
      </div>
      <tdesign-demo-block summary="带单行描述的日历">
        <div class="Calendar-demo">
          <customTextSingleDemo />
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
          <localTextDemo />
        </div>
      </tdesign-demo-block>

      <tdesign-demo-block summary="含不可选的日历">
        <div class="Calendar-demo">
          <disabledDemo />
        </div>
      </tdesign-demo-block>
    </tdesign-demo-block>

    <tdesign-demo-block summary="不使用 Popup">
      <withoutPopupDemo />
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import BaseDemo from './base.vue';
import multipleDemo from './multiple.vue';
import customTextSingleDemo from './custom-text-single.vue';
import customTextDemo from './custom-text.vue';
import rangeDemo from './range.vue';
import withoutPopupDemo from './without-popup.vue';
import SwitchModeDemo from './switch-mode.vue';
import localTextDemo from './local-text.vue';
import disabledDemo from './disabled.vue';
</script>

<style scoped>
.Calendar-demo {
  margin-bottom: 16px;
}
</style>
