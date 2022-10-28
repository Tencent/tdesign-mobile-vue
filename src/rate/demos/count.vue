<template>
  <div class="rate-demo-cell">
    <div class="rate-demo-cell__label">自定义数量</div>
    <t-rate v-model="value" :count="4" clearable :gap="defaultGap" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultGap = 8;
const value = ref(3);
</script>
