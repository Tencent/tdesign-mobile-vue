<template>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">请点击评分</div>
    <t-rate v-model="value" clearable :gap="defaultGap" @change="changeValue" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const changeValue = (val: Number) => {
  console.log('current value is', val);
};
const defaultGap = 8;
const value = ref(3);
</script>
