<template>
  <div class="example-search">
    <t-search v-model="value1" :max-length="10" placeholder="搜索预设文案"></t-search>
  </div>
  <div class="example-search">
    <t-search v-model="value2" :max-length="10" placeholder="输入tdesign，有预览效果"></t-search>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');
</script>
<style lang="less">
.example-search {
  background-color: var(--bg-color-demo, #fff);
  padding: 8px 16px;
}
</style>
