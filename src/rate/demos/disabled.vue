<template>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">仅展示</div>
    <t-rate v-model="value" disabled :gap="defaultGap" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref(3);
</script>
