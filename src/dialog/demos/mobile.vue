<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Dialog 对话框</h1>
    <p class="summary">用于显示重要提示或请求用户进行重要操作，一种打断当前操作的模态视图。</p>
    <h2 class="title">01 组件类型</h2>
    <tdesign-demo-block summary="反馈类对话框">
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
      <div class="dialog-demo" style="padding-bottom: 20px">
        <inputVue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="带图片的对话框">
      <div class="dialog-demo" style="padding-bottom: 20px">
        <imgVue />
      </div>
    </tdesign-demo-block>
    <h2 class="title">02 组件状态</h2>
    <tdesign-demo-block summary="其它形态对话框">
      <div class="dialog-demo" style="padding-bottom: 20px">
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

<style scoped lang="less">
.tdesign-mobile-demo {
  background-color: #fff;
}
</style>
