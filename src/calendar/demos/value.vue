<template>
  <div>
    <t-calendar v-model="visible" :value="value"></t-calendar>
    <t-cell title="选择日期" note="请选择日期" arrow @click="visible = true"></t-cell>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from 'vue';

const visible = ref(false);
const value = new Date('2022-08-08');
</script>
