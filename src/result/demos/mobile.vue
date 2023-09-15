<template>
  <div v-if="!showResult" class="tdesign-mobile-demo">
    <h1 class="title">Result 结果</h1>
    <p class="summary">结果反馈</p>
    <tdesign-demo-block title="01 类型" />

    <tdesign-demo-block summary="不同结果状态">
      <ThemeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block title="" summary="自定义结果">
      <CustomDemo />
    </tdesign-demo-block>

    <tdesign-demo-block title="" summary="页面位置展示">
      <div class="padding">
        <t-button size="large" variant="outline" block theme="primary" @click="handleClick"> 页面位置展示 </t-button>
      </div>
    </tdesign-demo-block>
  </div>

  <template v-else>
    <div class="result-page">
      <div class="demo-section__wrapper">
        <t-result theme="success" title="成功状态" description="描述文字" />
      </div>
      <div class="demo-section__wrapper">
        <t-button size="large" variant="outline" block theme="primary" @click="handleClick"> 返回 </t-button>
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
