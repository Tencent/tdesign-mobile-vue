<template>
  <t-checkbox-group v-model:value="current" :options="options" @change="checkboxGroupChange" />
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const current = ref(['checkbox1', 'checkbox2']);
const options = ref([
  { label: '多选', value: 'checkbox1' },
  { label: '多选', value: 'checkbox2' },
  {
    label: '多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行多选标题多行',
    value: 'checkbox3',
    maxLabelRow: 2,
  },
  {
    label: '多选',
    value: 'checkbox4',
    content: '描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息',
    maxContentRow: 2,
  },
]);

watch(
  () => current.value,
  (val) => {
    console.log('current:', val);
  },
);

const checkboxGroupChange = (value: any, context: { e: Event }) => {
  console.log('value:', value);
  console.log('Event:', context);
};
</script>
