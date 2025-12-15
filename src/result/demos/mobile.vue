<template>
  <div v-if="!showResult" class="tdesign-mobile-demo">
    <h1 class="title">Result 结果</h1>
    <p class="summary">用于反馈不同结果的展示。</p>
    <tdesign-demo-block title="组件类型" />

    <tdesign-demo-block summary="基础结果">
      <ThemeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="自定义结果" title="">
      <CustomDemo />
    </tdesign-demo-block>

    <tdesign-demo-block summary="页面位置展示" title="">
      <div class="padding">
        <t-button block size="large" theme="primary" variant="outline" @click="handleClick"> 页面位置展示</t-button>
      </div>
    </tdesign-demo-block>
  </div>

  <template v-else>
    <div class="result-page">
      <div class="demo-section__wrapper">
        <t-result description="描述文字" theme="success" title="成功状态" />
      </div>
      <div class="demo-section__wrapper">
        <t-button block size="large" theme="primary" variant="outline" @click="handleClick"> 返回</t-button>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import ThemeDemo from './theme.vue';
import CustomDemo from './custom.vue';

const showResult = ref(false);

const handleClick = () => {
  showResult.value = !showResult.value;
};
</script>

<style lang="less" scoped>
.tdesign-mobile-demo {
  background-color: var(--bg-color-demo, #fff);

  .padding {
    padding: 0 16px 16px;
  }
}

.result-page {
  height: calc(100vh - 50px);
  background-color: var(--bg-color-demo, #fff);

  .demo-section__wrapper {
    padding: 24px 16px;
  }
}
</style>
