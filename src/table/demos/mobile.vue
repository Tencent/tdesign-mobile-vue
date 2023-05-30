<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Table 表格</h1>
    <p class="summary">
      表格常用于展示同类结构下的多种数据，易于组织、对比和分析等，并可对数据进行搜索、筛选、排序等操作。一般包括表头、数据行和表尾三部分。
    </p>
    <tdesign-demo-block title="01 组件类型" summary="基础表格" :padding="true">
      <baseDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="横向平铺可滚动表格" :padding="true">
      <scrollDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带斑马纹表格样式" :padding="true">
      <stripeDemo />
    </tdesign-demo-block>
    <tdesign-demo-block summary="带边框表格样式" :padding="true">
      <borderedDemo />
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts" setup>
import baseDemo from './base.vue';
import scrollDemo from './scroll.vue';
import stripeDemo from './stripe.vue';
import borderedDemo from './bordered.vue';
</script>
