<template>
  <div v-if="!showIndexes" class="tdesign-mobile-demo">
    <h1 class="title">Indexes 索引</h1>
    <p class="summary">用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容。</p>
    <tdesign-demo-block title="01 组件类型" summary="基础索引类型">
      <div class="indexes-demo">
        <t-button size="large" theme="primary" variant="outline" block @click="handleClick('base')">
          基础用法
        </t-button>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block title="02 组件样式" summary="其他索引类型">
      <div class="indexes-demo">
        <t-button size="large" theme="primary" variant="outline" block @click="handleClick('custom')">
          胶囊索引
        </t-button>
      </div>
    </tdesign-demo-block>
  </div>
  <div v-else>
    <baseDemo v-if="type === 'base'" />
    <custom v-if="type === 'custom'" />
    <t-fab
      :icon="iconFunc"
      text="返回"
      :style="{ 'z-index': 100, right: '16px', bottom: '32px' }"
      :button-props="{ variant: 'outline' }"
      @click="goBack"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, h } from 'vue';
import { ChevronLeftDoubleIcon } from 'tdesign-icons-vue-next';
import baseDemo from './base.vue';
import custom from './custom.vue';

const showIndexes = ref(false);
const type = ref('letter');
const iconFunc = () => h(ChevronLeftDoubleIcon);

const goBack = () => (showIndexes.value = false);

const handleClick = (t = 'base') => {
  showIndexes.value = true;
  type.value = t;
};
</script>
<style lang="less">
body {
  background-color: #fff;
}
.tdesign-mobile-demo {
  background-color: #fff;
}
.indexes-demo {
  margin: 0 16px;
  .t-button {
    margin-bottom: 16px;
  }
}
.tdesign-demo-topnav {
  z-index: 99;
}
&::-webkit-scrollbar {
  display: none;
}
</style>
