<template>
  <t-calendar v-model:visible="visible" :value="value" :min-date="minDate" :max-date="maxDate" />
  <t-cell title="自定义日期区间" arrow @click="visible = true"></t-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const minDate = new Date(2022, 0, 1);
const maxDate = new Date(2022, 0, 31);

const visible = ref(false);
const value = new Date(2022, 0, 15);
</script>
