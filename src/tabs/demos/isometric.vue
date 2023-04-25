<template>
  <div class="demo-tab-bar">
    <t-tabs :value="currentValue" :list="list" :space-evenly="false" @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentValue = ref('1');
const list = [
  {
    value: '1',
    label: '选项',
  },
  {
    value: '2',
    label: '选项',
  },
  {
    value: '3',
    label: '选项',
  },
  {
    value: '4',
    label: '选项',
  },
  {
    value: '5',
    label: '选项',
  },
  {
    value: '6',
    label: '选项',
  },

  {
    value: '7',
    label: '选项',
  },
  {
    value: '8',
    label: '选项',
  },
  {
    value: '9',
    label: '选项',
  },
];

const onChange = (value: string) => {
  currentValue.value = value;
  console.log(`change to ${value}`);
};
</script>

<style lang="less" scoped>
.t-tabs {
  margin-bottom: 16px;
}
</style>
