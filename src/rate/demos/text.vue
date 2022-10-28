<template>
  <CustomCell title="请点击评分">
    <t-rate v-model="value" clearable show-text :gap="defaultGap" :size="16" />
  </CustomCell>
  <CustomCell title="请点击评分">
    <t-rate v-model="value" clearable show-text :texts="texts" :gap="defaultGap" />
  </CustomCell>
  <CustomCell title="请点击评分">
    <t-rate v-model="value" clearable show-text :texts="texts" variant="outline" :gap="defaultGap" />
  </CustomCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CustomCell from './custom-cell.vue';

const defaultGap = 8;
const value = ref(3);
const texts = ref(['很差', '差', '一般', '好评', '优秀']);
</script>
