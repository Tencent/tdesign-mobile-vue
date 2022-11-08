<template>
  <t-slider v-model="value" :label="false" :on-change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(0);
const onChange = ($event: number | number[]) => {
  console.log(`change to ${$event}`);
};
</script>
