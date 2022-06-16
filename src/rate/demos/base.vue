<template>
  <t-rate v-model="value[0]" clearable :gap="defaultGap" @change="changeValue" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const changeValue = (val: Number) => {
  console.log('current value is', val);
};
const defaultGap = 8;
const value = ref([1, 2, 3, 3.5, 3, 3, 3, 3, 3, 3, 3, 3]);
</script>
