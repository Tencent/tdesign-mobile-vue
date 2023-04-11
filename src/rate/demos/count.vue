<template>
  <CustomCell title="自定义评分数量">
    <t-rate v-model="value" :count="3" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './components/custom-cell.vue';

const value = ref(2);
</script>
