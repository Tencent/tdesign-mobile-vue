<template>
  <CustomCell title="请点击评分">
    <t-rate v-model="value" clearable :gap="defaultGap" @change="changeValue" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './custom-cell.vue';

const changeValue = (val: Number) => {
  console.log('current value is', val);
};
const defaultGap = 8;
const value = ref(3);
</script>
