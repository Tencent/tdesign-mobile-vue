<template>
  <div v-for="(item, index) in resultList" :key="index">
    <t-result :theme="item.theme" :title="item.title" :description="item.description" class="space" />
  </div>
</template>

<script lang="ts" setup>
import { toRefs, defineProps } from 'vue';

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
