<template>
  <t-slider v-model="value" show-extreme-value @change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(60);
function onChange($event: number | number[]) {
  console.log(`change to ${$event}`);
}
</script>
