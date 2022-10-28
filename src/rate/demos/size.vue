<template>
  <div class="rate-demo-cell rate-demo-cell--space">
    <div class="rate-demo-cell__label">规格20</div>
    <t-rate v-model="value1" clearable :gap="defaultGap" />
  </div>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">规格16</div>
    <t-rate v-model="value" size="16" clearable :gap="defaultGap" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref(3);
const value1 = ref(3);
</script>
