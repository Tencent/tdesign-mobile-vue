<template>
  <t-rate v-model="value" clearable :color="['#FFC51C', '#E8E8E8']" :gap="defaultGap" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref(3);
</script>
