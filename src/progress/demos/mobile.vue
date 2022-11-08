<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Progress 进度条</h1>
    <p class="summary">用于展示任务当前的进度</p>
    <tdesign-demo-block title="01 类型" summary="基础进度条">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="隐藏数值进度条">
      <div class="progress-demo">
        <t-progress :percentage="88" :label="false" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义样式">
      <CustomDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义线宽">
      <div class="progress-demo">
        <t-progress :percentage="88" :stroke-width="20" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="默认状态">
      <div class="progress-demo">
        <t-progress :percentage="88" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="错误状态">
      <div class="progress-demo">
        <t-progress :percentage="88" status="error" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="警告状态">
      <div class="progress-demo">
        <t-progress :percentage="88" status="warning" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="成功状态">
      <div class="progress-demo">
        <t-progress :percentage="88" status="success" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="过渡样式">
      <div class="progress-demo">
        <t-progress :percentage="percentage" />
        <div class="button-group">
          <t-button theme="primary" variant="outline" size="small" @click="clickReduce">减少</t-button>
          <div class="space"></div>
          <t-button theme="primary" size="small" @click="clickAdd">增加</t-button>
        </div>
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseDemo from './base.vue';
import CustomDemo from './custom.vue';

const customPercentage = ref(88);
const percentage = ref(88);

function clickAdd() {
  percentage.value = Math.min(100, percentage.value + 10);
}

function clickReduce() {
  percentage.value = Math.max(0, percentage.value - 10);
}
</script>
<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
  .button-group {
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
    .space {
      width: 16px;
    }
  }
}
</style>
