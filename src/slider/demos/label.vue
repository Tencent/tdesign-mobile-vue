<template>
  <t-slider :value="value" :label="true" :on-change="onChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(10);
const onChange = (e: any) => {
  value.value = e.value;
};
</script>
