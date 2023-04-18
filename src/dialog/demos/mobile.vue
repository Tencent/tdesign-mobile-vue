<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Dialog 对话框</h1>
    <p class="summary">用于显示重要提示或请求用户进行重要操作，一种打断当前操作的模态视图。</p>
    <tdesign-demo-block title="01 组件类型" summary="反馈类对话框">
      <div class="dialog-demo">
        <feedbackVue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="确认类对话框">
      <div class="dialog-demo">
        <confirmVue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="输入对话框">
      <div class="dialog-demo">
        <inputVue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图片的对话框">
      <div class="dialog-demo">
        <imgVue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件状态" summary="其它形态对话框">
      <div class="dialog-demo">
        <multiState />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import feedbackVue from './feedback.vue';
import confirmVue from './confirm.vue';
import inputVue from './input.vue';
import imgVue from './image-dialog.vue';
import multiState from './multi-state.vue';
</script>

<style lang="less">
.tdesign-mobile-demo {
  background-color: #fff;

  .btn-gap {
    width: 100%;
    height: 16px;
  }
  .middle-container {
    padding: 20px;
    overflow: auto;
    max-height: 100px;
  }
}
</style>
