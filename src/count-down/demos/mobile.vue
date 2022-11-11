<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">CountDown 倒计时</h1>
    <p class="summary">用于实时展示倒计时数值。</p>
    <tdesign-demo-block title="01 类型" summary="动态倒计时间主要有时间数字和时分秒分割组成">
      <BaseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 规格" summary="动倒计时带方底和圆底各尺寸规格">
      <div class="demo-count-down">
        <SpecDemo />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import SpecDemo from './specs.vue';
import BaseDemo from './base.vue';
</script>

<style lang="less">
.demo__box {
  display: flex;
  font-size: 14px;
  align-items: center;
  margin: 0 0 8px 16px;
  justify-content: space-between;
  font-family: PingFang SC, Microsoft YaHei, Arial Regular;
  .format {
    opacity: 1;
    font-size: 12px;
    margin-right: 30%;
    color: rgba(0, 0, 0, 0.4);
  }
}
</style>
