<template>
  <t-rate v-model="value" clearable :gap="defaultGap" @change="changeValue" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const changeValue = (val: Number) => {
  console.log('current value is', val);
};
const defaultGap = 8;
const value = ref(1);
</script>
