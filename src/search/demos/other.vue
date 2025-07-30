<template>
  <div class="example-search">
    <t-search placeholder="搜索预设文案" center @change="onChange"></t-search>
  </div>
</template>

<script lang="ts" setup>
const onChange = (val: string) => {
  console.log('change: ', val);
};
</script>
