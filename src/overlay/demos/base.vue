<template>
  <t-button size="large" block variant="outline" @click="visible = true">基础用法</t-button>
  <t-overlay :visible="visible" @click="visible = false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
