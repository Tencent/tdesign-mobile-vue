<template>
  <div class="step-demo">
    <t-steps v-model="current" theme="dot" layout="vertical">
      <t-step title="事件描述"></t-step>
      <t-step title="事件描述"></t-step>
      <t-step title="事件描述"></t-step>
    </t-steps>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
</script>
