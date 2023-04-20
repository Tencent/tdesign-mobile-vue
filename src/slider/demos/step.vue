<template>
  <t-slider v-model="value" :marks="marks" :step="20" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(60);
const marks = ref({
  0: '0',
  20: '20',
  40: '40',
  60: '60',
  80: '80',
  100: '100',
});
</script>
