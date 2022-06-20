<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Loading 加载中</h1>
    <p class="summary">加载过程中只有图标显示。适用于打开页面或操作完成后模块内等待刷新的加载场景。</p>
    <tdesign-demo-block title="01 类型" summary="纯图标">
      <div class="loading-demo first">
        <baseVue />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标加文字横向">
      <div class="loading-demo second">
        <t-loading text="加载中..." />
        <t-loading theme="spinner" text="加载中..." />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="图标加文字竖向">
      <div class="loading-demo">
        <t-loading text="加载中" layout="vertical" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="纯文字">
      <div class="loading-demo loading-demo--column">
        <t-loading :indicator="false" text="加载中..." />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="加载失败">
      <div class="loading-demo loading-demo--column">
        <t-loading :indicator="false">
          <div class="custom-error">加载失败 <span>刷新</span></div>
        </t-loading>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="页面进度条加载">
      <div class="loading-demo">
        <t-loading theme="bar" :progress="progress" />
        <t-button block variant="outline" @click.stop="onShowLoadingBar">{{
          progress > 0 && progress < 1 ? '页面加载中...' : '页面进度条加载'
        }}</t-button>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="延迟加载">
      <div class="loading-demo loading-demo--column">
        <div class="switch-wrap">
          <t-switch @change="onChangeLoading"></t-switch>
          <div>{{ showLoading ? '请求发起，延迟显示loading' : '请求结束，隐藏loading' }}</div>
        </div>
        <t-loading :delay="1000" :loading="showLoading" text="加载中..." />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 规格" summary="图标加文字横向">
      <div class="loading-demo loading-demo--column">
        <t-loading size="large" text="加载中（大）..." />
        <t-loading size="medium" text="加载中（中）..." />
        <t-loading size="small" text="加载中（小）..." />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import baseVue from './base.vue';

const progress = ref(0);
let timer: any;

const onShowLoadingBar = () => {
  if (timer) {
    return;
  }
  progress.value = 0;
  timer = setInterval(() => {
    if (progress.value >= 1) {
      clearInterval(timer);
      timer = null;

      setTimeout(() => {
        progress.value = 0;
      }, 2000);
      return;
    }
    progress.value += 0.01;
  }, 100);
};

const showLoading = ref(false);
const onChangeLoading = (value: boolean) => {
  showLoading.value = value;
};
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

  .switch-wrap {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.7);
    font-size: 14px;
    .t-switch {
      margin-right: 10px;
    }
  }

  .custom-error {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.9);
    span {
      color: rgba(0, 82, 217, 1);
      cursor: pointer;
    }
  }
}
</style>
