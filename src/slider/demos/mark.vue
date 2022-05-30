<template>
  <t-slider v-model="value" :marks="marks" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(50);
const marks = ref({ 0: '小', 50: '中', 100: '大' });
// const marks = ref([0, 50, 100]);
// const marks = ref({
//   0: (val: number) => `${val}%`,
//   50: (val: number) => `${val}%`,
//   100: (val: number) => `${val}%`,
// });
</script>
