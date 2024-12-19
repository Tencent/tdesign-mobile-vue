<template>
  <div class="example-search">
    <t-search v-model="value1" :maxlength="10" placeholder="最多输入10个汉字"></t-search>
  </div>
  <div class="example-search">
    <t-search v-model="value2" :maxcharacter="10" placeholder="最多输入10个字符（汉字算两个）"></t-search>
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
