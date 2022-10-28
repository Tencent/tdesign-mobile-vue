<template>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">半星评价</div>
    <t-rate v-model="value" clearable allow-half :gap="defaultGap" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref(3.5);
</script>
