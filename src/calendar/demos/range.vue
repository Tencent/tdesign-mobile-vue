<template>
  <div>
    <t-calendar v-model:visible="visible" :value="value" type="range" @confirm="handleConfirm"></t-calendar>
    <t-cell title="区间选择日期" arrow @click="visible = true"></t-cell>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const handleConfirm = (val: string) => {
  console.log(val);
};
const today = new Date();
const tomorrow = new Date(today.getTime() + 5 * 24 * 3600 * 1000);
const value = ref([today, tomorrow]);
</script>
