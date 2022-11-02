<template>
  <t-cell-group title="基础搜索框">
    <t-search v-model="value" :clearable="true" placeholder="请输入关键字" @change="onChange"></t-search>
  </t-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const onChange = (val: string) => {
  console.log('change: ', val);
};

const value = ref('');
</script>
