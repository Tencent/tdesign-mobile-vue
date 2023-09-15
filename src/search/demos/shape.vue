<template>
  <div class="example-search">
    <t-search v-model="value" :clearable="true" shape="round" placeholder="请输入关键字" @change="onChange"></t-search>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const onChange = (val: string) => {
  console.log('change: ', val);
};

const value = ref('');
</script>
<style lang="less">
.example-search {
  background-color: var(--bg-color-demo, #fff);
  padding: 8px 16px;
}
</style>
