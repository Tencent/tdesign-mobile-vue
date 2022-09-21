<template>
  <div>
    <t-calendar v-model="visible" title="请选择日期" @confirm="handleConfirm" @cell-click="cellClick"></t-calendar>
    <t-cell title="选择日期" note="请选择日期" arrow @click="visible = true"></t-cell>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

const visible = ref(false);
const handleConfirm = (val: string) => {
  console.log(val);
};
const cellClick = (val: any) => {
  console.log(val);
};
</script>
