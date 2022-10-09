<template>
  <t-calendar v-model:visible="visible" :confirm-btn="confirmBtn" />
  <t-cell title="自定义按钮" arrow @click="visible = true"></t-cell>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const confirmBtn = {
  content: 'ok',
  theme: 'danger',
  shape: 'round',
};
</script>
