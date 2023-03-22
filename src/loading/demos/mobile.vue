<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Loading 加载中</h1>
    <p class="summary">用于表示页面或操作的加载状态，给予用户反馈的同时减缓等待的焦虑感，由一个或一组反馈动效组成。</p>
    <tdesign-demo-block title="01 组件类型" summary="纯图标">
      <div class="loading-demo first">
        <base-vue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标加文字横向">
      <div class="loading-demo">
        <horz />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标加文字竖向">
      <div class="loading-demo">
        <vert />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯文字">
      <div class="loading-demo">
        <pure-text />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件尺寸">
      <div class="loading-demo loading-demo--column">
        <size />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="03 加载速度" summary="加载速度调整">
      <div class="loading-demo loading-demo--column">
        <speed />
      </div>
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
