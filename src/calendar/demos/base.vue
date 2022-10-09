<template>
  <div>
    <t-calendar v-model:visible="visible" @confirm="handleConfirm" @select="handleSelect"></t-calendar>
    <t-cell title="单个选择日期" arrow @click="visible = true"></t-cell>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const handleConfirm = (val: string) => {
  console.log(val);
};
const handleSelect = (val: any) => {
  console.log(val);
};
</script>
