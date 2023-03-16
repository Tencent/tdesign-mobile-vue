<template>
  <t-cell title="大尺寸 32">
    <template #rightIcon>
      <t-switch v-model="value" disabled />
    </template>
  </t-cell>
  <t-cell title="中尺寸 28">
    <template #rightIcon>
      <t-switch disabled />
    </template>
  </t-cell>
  <t-cell title="小尺寸 24">
    <template #rightIcon>
      <t-switch v-model="value" disabled label="描述信息" />
    </template>
  </t-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
