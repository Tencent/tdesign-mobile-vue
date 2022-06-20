<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Progress 进度条</h1>
    <p class="summary">展示操作的当前进度</p>
    <tdesign-demo-block title="01 类型" summary="基础进度条">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="默认状态">
      <div class="progress-demo">
        <t-progress :percentage="88" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="进度状态发生重大错误">
      <div class="progress-demo">
        <t-progress :percentage="88" status="error" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="进度中止">
      <div class="progress-demo">
        <t-progress :percentage="88" status="warning" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="进度完成">
      <div class="progress-demo">
        <t-progress :percentage="100" />
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
    <tdesign-demo-block summary="自定义颜色">
      <TypeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 规格" summary="带数值进度条">
      <div class="progress-demo">
        <t-progress :percentage="88" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="无数值进度条">
      <div class="progress-demo">
        <t-progress :percentage="88" :label="false" />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseDemo from './base.vue';
import TypeDemo from './type.vue';

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
