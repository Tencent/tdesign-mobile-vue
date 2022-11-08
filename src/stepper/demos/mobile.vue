<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Stepper 步进器</h1>
    <p class="summary">用户通过调整“+”按钮、“-”按钮、数字输入框来调整具体需要的数值，可设置最大值和最小值</p>
    <tdesign-demo-block title="01 类型" summary="基础步进器">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带单位步进器">
      <unitDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯步进器">
      <div style="margin-left: 16px">
        <pureDemo />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="步进器状态">
      <statusDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import pureDemo from './pure-stepper.vue';
import unitDemo from './unit-stepper.vue';
import statusDemo from './status.vue';
</script>
