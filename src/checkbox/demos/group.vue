<template>
  <div>
    <t-checkbox-group v-model="checkBox" class="checkbox-group-demo" :options="options"></t-checkbox-group>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const checkBox = ref(['1', '2']);
const options = [
  {
    label: '全选',
    checkAll: true,
    indeterminate: true,
  },
  {
    label: '多选1',
    value: '1',
  },
  {
    label: '多选2',
    value: '2',
  },
  {
    label: '多选3',
    value: '3',
  },
];
</script>
<style lang="less" scoped>
.checkbox-group-demo {
  background: #fff;
}
</style>
