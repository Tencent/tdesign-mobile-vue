<template>
  <t-slider v-model="rangeValue" show-extreme-value range @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rangeValue = ref([30, 70]);

function onChange($event: number | number[]) {
  console.log(`change to ${$event}`);
}
</script>
