<template>
  <t-stepper v-model="number" theme="grey" :step="1" :min="0" :max="100" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const number = ref(3);
</script>
