<template>
  <t-rate v-model="value[2]" :count="6" clearable :gap="defaultGap" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref([1, 2, 3, 3.5, 3, 3, 3, 3, 3, 3, 3, 3]);
</script>
