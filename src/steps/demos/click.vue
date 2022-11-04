<template>
  <div class="step-demo">
    <t-steps v-model="current" :readonly="false">
      <t-step title="步骤描述"></t-step>
      <t-step title="步骤描述"></t-step>
    </t-steps>
    <t-steps v-model="current1" :readonly="false">
      <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
      <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
    </t-steps>
  </div>
  <div class="step-demo">
    <t-steps :default-value="current2" :readonly="false">
      <t-step title="步骤描述"></t-step>
      <t-step title="步骤描述"></t-step>
      <t-step title="步骤描述"></t-step>
    </t-steps>
    <t-steps :default-value="current3" :readonly="false">
      <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
      <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
      <t-step title="步骤描述" content="辅助信息文字最多两行"></t-step>
    </t-steps>
  </div>
  <div class="step-demo">
    <t-steps v-model="current4" :readonly="false">
      <t-step title="步骤描述"></t-step>
      <t-step title="步骤描述"></t-step>
      <t-step title="步骤描述"></t-step>
      <t-step title="步骤描述"></t-step>
    </t-steps>
    <t-steps v-model="current5" :readonly="false" :options="stepData"> </t-steps>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
const current1 = ref(1);
const current2 = ref(1);
const current3 = ref(1);
const current4 = ref(1);
const current5 = ref(1);
const stepData = ref([
  {
    title: '步骤描述',
    content: '辅助信息文字最多两行',
  },
  {
    title: '步骤描述',
    content: '辅助信息文字最多两行',
  },
  {
    title: '步骤描述',
    content: '辅助信息文字最多两行',
  },
  {
    title: '步骤描述',
    content: '辅助信息文字最多两行',
  },
]);
</script>
