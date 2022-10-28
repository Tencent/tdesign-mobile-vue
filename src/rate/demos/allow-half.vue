<template>
  <CustomCell title="半星评价">
    <t-rate v-model="value" clearable allow-half :gap="defaultGap" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './custom-cell.vue';

const defaultGap = 8;
const value = ref(3.5);
</script>
