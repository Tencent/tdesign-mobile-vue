<template>
  <div v-if="!showIndexes" class="tdesign-mobile-demo">
    <h1 class="title">Indexes 索引</h1>
    <p class="summary">用于页面中信息快速检索，可以根据目录中的页码快速找到所需的内容</p>
    <tdesign-demo-block title="01 类型" summary="基础索引类型">
      <div class="indexes-demo">
        <t-button size="large" variant="outline" block @click="handleClick('letter')"> 字母索引 </t-button>
        <t-button size="large" variant="outline" block @click="handleClick('number')"> 数字索引 </t-button>
      </div>
    </tdesign-demo-block>
  </div>
  <BaseDemo v-else :type="type" @go-back="goBack" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseDemo from './base.vue';

const showIndexes = ref(false);
const type = ref('letter');
const router = useRouter();

const goBack = () => (showIndexes.value = false);

const handleClick = (t = 'letter') => {
  showIndexes.value = true;
  type.value = t;
};
</script>
<style lang="less">
.indexes-demo {
  margin: 0 16px;
  .t-button {
    margin-bottom: 16px;
  }
}
.tdesign-demo-topnav {
  z-index: 99;
}
</style>
