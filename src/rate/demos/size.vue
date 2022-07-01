<template>
  <t-rate v-model="value" size="16" clearable :gap="defaultGap" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref(3);
</script>
