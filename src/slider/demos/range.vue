<template>
  <t-slider v-model="rangeValue" show-value range @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rangeValue = ref([30, 80]);

function onChange($event: number | number[]) {
  console.log(`change to ${$event}`);
}
</script>
