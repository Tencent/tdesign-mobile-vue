<template>
  <t-slider v-model="value" :label="label" :marks="marks" :step="50" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(50);
const label = ref(false);
const marks = ref({ 0: '小', 50: '中', 100: '大' });
</script>
