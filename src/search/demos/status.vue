<template>
  <t-cell-group title="默认状态">
    <t-search placeholder="搜索预设文案" @change="onChange"></t-search>
  </t-cell-group>
  <t-cell-group title="点击状态">
    <t-search placeholder="搜索预设文案" :focus="true" action="取消" @change="onChange"></t-search>
  </t-cell-group>
  <t-cell-group title="输入状态">
    <t-search v-model="value" placeholder="搜索预设文案" :focus="true" action="取消" @change="onChange"></t-search>
  </t-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const onChange = (val: string) => {
  console.log('change: ', val);
};

const value = ref('搜索预设文案');
</script>
