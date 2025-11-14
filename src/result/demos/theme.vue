<template>
  <div v-for="(item, index) in resultList" :key="index">
    <t-result :theme="item.theme" :title="item.title" class="space" />
  </div>
  <tdesign-demo-block summary="带描述的结果">
    <div v-for="(item, index) in resultList" :key="index">
      <t-result :description="item.description" :theme="item.theme" :title="item.title" class="space" />
    </div>
  </tdesign-demo-block>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const resultList = [
  {
    title: '成功状态',
    theme: 'success',
    description: '描述文字',
  },
  {
    title: '失败状态',
    theme: 'error',
    description: '描述文字',
  },
  {
    title: '警示状态',
    theme: 'warning',
    description: '描述文字',
  },
  {
    title: '默认状态',
    theme: 'default',
    description: '描述文字',
  },
];

const props = defineProps({
  theme: String,
  title: String,
  description: String,
});
</script>

<style>
.space {
  margin-bottom: 48px;
}
</style>
