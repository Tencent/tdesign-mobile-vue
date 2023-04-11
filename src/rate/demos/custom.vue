<template>
  <CustomCell title="自定义评分">
    <t-rate v-model="value" icon="thumb-up" @change="changeValue" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const changeValue = (val: Number) => {
  console.log('current value is', val);
};
const value = ref(3);
</script>
