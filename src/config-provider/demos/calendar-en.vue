<template>
  <t-config-provider :global-config="globalConfig">
    <t-calendar v-model:visible="visible" @close="onClose" @confirm="handleConfirm" @select="handleSelect" />
    <t-cell title="单个选择日期" arrow :note="dateNote" @click="visible = true" />
  </t-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import merge from 'lodash/merge';
import enConfig from '../../locale/en_US';

// 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
const globalConfig = merge(enConfig, {
  calendar: {
    title: 'title test',
  },
});

const visible = ref(false);
const dateNote = ref('');

const format = (val: Date) => {
  const date = new Date(val);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const handleConfirm = (val: Date) => {
  console.log(val);
  dateNote.value = format(val);
};
const handleSelect = (val: Date) => {
  console.log(val);
};
const onClose = (trigger: string) => {
  console.log('closed by', trigger);
};
</script>
