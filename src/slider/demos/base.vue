<template>
  <t-slider v-model="value" :label="label" :on-change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(60);
const label = ref(false);
const onChange = ($event: number | number[]) => {
  console.log(`change to ${$event}`);
};
</script>
