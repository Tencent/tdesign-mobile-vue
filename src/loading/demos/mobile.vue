<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Loading 加载中</h1>
    <p class="summary">用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。</p>
    <tdesign-demo-block title="01 组件类型" summary="纯图标" :padding="true">
      <div class="loading-demo--flex">
        <base-vue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标加文字横向" :padding="true">
      <div class="loading-demo--flex">
        <horz />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标加文字竖向" :padding="true">
      <div class="loading-demo--flex">
        <vert />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯文字" :padding="true">
      <div class="loading-demo--flex">
        <pure-text />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件尺寸">
      <size />
    </tdesign-demo-block>
    <tdesign-demo-block title="03 加载速度" summary="加载速度调整">
      <speed />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseVue from './base.vue';
import horz from './horz.vue';
import vert from './vert.vue';
import pureText from './pure-text.vue';
import speed from './speed.vue';
import size from './size.vue';
</script>

<style scoped lang="less">
.loading-demo--flex {
  display: flex;
  align-items: center;
}
</style>
