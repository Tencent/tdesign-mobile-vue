<template>
  <div>
    <t-calendar v-model:visible="visible" @close="onClose" @confirm="handleConfirm" @select="handleSelect" />
    <t-cell title="单个选择日期" arrow :note="dateNote" @click="visible = true" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

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
