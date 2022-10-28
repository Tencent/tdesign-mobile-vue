<template>
  <CustomCell title="自定义数量">
    <t-rate v-model="value" :count="4" clearable :gap="defaultGap" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './custom-cell.vue';

const defaultGap = 8;
const value = ref(3);
</script>
