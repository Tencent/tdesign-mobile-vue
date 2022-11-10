<template>
  <div class="tdesign-mobile-demo">
    <div class="list-demo">
      <div v-if="currentTab === 'info'">
        <h1 class="title">List 列表</h1>
        <p class="summary">
          瀑布流滚动加载，用于展示同一类型信息的长列表。当列表即将滚动到底部时，会触发事件并加载更多列表项。
        </p>
        <tdesign-demo-block title="01 类型" summary="基础列表">
          <t-button size="large" variant="outline" @click="onChangeTab('base')"> 基础列表 </t-button>
          <t-button size="large" variant="outline" @click="onChangeTab('pull-refresh')"> 下拉刷新 </t-button>
          <t-button size="large" variant="outline" @click="onChangeTab('error-tip')"> 错误提示 </t-button>
        </tdesign-demo-block>
      </div>
      <div v-if="currentTab === 'base'">
        <BaseVue />
      </div>
      <div v-if="currentTab === 'error-tip'">
        <ErrTipDemo />
      </div>
      <div v-if="currentTab === 'pull-refresh'">
        <div class="pull-refresh-wrap">
          <PullRefreshDemo />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BaseVue from './base.vue';
import ErrTipDemo from './err-tip.vue';
import PullRefreshDemo from './pull-refresh.vue';

const currentTab = ref('info');

onMounted(() => {
  window.onpopstate = function () {
    currentTab.value = 'info';
  };
});

onUnmounted(() => {
  window.onpopstate = null;
});

const onChangeTab = (val: any) => {
  currentTab.value = val;
  history.pushState({}, '', '?tab=demo');
};
</script>

<style lang="less">
.list-demo {
  .t-list {
    .cell {
      width: 100%;
      text-align: center;
    }
    .error {
      text-align: center;
      color: #969799;
      font-size: 14px;
      margin-top: 8px;
    }
  }
  .custom-error {
    font-size: 14px;
    color: #969799;
    text-align: center;
    padding-top: 16px;
    cursor: default;

    span {
      color: #0052d9;
      cursor: pointer;
    }
  }
  .t-button {
    margin: 0 16px 16px 16px;
    width: calc(100% - 32px);
  }
}
</style>
