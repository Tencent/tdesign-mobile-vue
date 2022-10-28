<template>
  <CustomCell title="仅展示">
    <t-rate v-model="value" disabled :gap="defaultGap" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const defaultGap = 8;
const value = ref(3);
</script>
