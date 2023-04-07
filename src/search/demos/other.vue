<template>
  <div class="example-search">
    <t-search placeholder="搜索预设文案" @change="onChange"></t-search>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const onChange = (val: string) => {
  console.log('change: ', val);
};

const value = ref('搜索预设文案');
</script>
