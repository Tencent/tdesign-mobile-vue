<template>
  <CustomCell title="空心评分">
    <t-rate v-model="value1" variant="outline" clearable :color="['#FFC51C', '#E8E8E8']" :gap="defaultGap" />
  </CustomCell>
  <CustomCell title="实心评分">
    <t-rate v-model="value" clearable allow-half :color="['#FFC51C', '#E8E8E8']" :gap="defaultGap" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './custom-cell.vue';

const defaultGap = 8;
const value = ref(2.5);
const value1 = ref(3);
</script>
