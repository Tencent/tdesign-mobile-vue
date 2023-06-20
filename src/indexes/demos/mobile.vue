<template>
  <div class="tdesign-mobile-demo">
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
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleClick = (t = 'base') => {
  router.push(`/indexes/${t}`);
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
