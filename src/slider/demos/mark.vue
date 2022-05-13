<template>
  <t-slider v-model="value" :marks="marks" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(50);
const marks = ref({ 0: '小', 50: '中', 100: '大' });
</script>
