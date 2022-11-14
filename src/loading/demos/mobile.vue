<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Loading 加载中</h1>
    <p class="summary">用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。</p>
    <tdesign-demo-block title="01 类型" summary="纯icon">
      <div class="loading-demo first">
        <base-vue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="icon加文字横向">
      <div class="loading-demo">
        <horz />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="icon加文字竖向">
      <div class="loading-demo">
        <vert />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯文字">
      <div class="loading-demo">
        <pure-text />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="进度条加载">
      <div class="loading-demo">
        <bar />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="如果加载状态在延迟内结束，则不显示">
      <div class="loading-demo loading-demo--column">
        <delay />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 加载速度" summary="加载速度可配置，加载一周的时间单位（毫秒）">
      <div class="loading-demo loading-demo--column">
        <speed />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="04 规格" summary="支持自定义加载规格">
      <div class="loading-demo loading-demo--column">
        <size />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import baseVue from './base.vue';
import horz from './horz.vue';
import vert from './vert.vue';
import pureText from './pure-text.vue';
import delay from './delay.vue';
import bar from './bar.vue';
import speed from './speed.vue';
import size from './size.vue';
</script>

<style scoped lang="less">
.loading-demo {
  display: flex;
  align-items: center;
  padding: 0 16px;

  &--column {
    flex-direction: column;
    align-items: flex-start;
    .t-loading {
      margin-bottom: 12px;
    }
  }

  &.first,
  &.second {
    .t-loading {
      margin-right: 36px;
    }

    .dots-loading {
      margin-left: 14px;
    }
  }
}
</style>
