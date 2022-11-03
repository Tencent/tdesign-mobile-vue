<template>
  <div class="step-demo">
    <t-steps v-model="current" :readonly="true">
      <t-step title="当前步骤"></t-step>
      <t-step title="未完成步骤"></t-step>
    </t-steps>
    <t-steps v-model="current" :readonly="true">
      <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
    </t-steps>
    <t-steps v-model="current" :readonly="true">
      <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
    </t-steps>
  </div>
  <div class="step-demo">
    <t-steps v-model="current1" :readonly="true">
      <t-step title="已完成步骤"></t-step>
      <t-step title="当前步骤"></t-step>
      <t-step title="未完成步骤"></t-step>
    </t-steps>
    <t-steps v-model="current1" :readonly="true">
      <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
    </t-steps>
    <t-steps v-model="current1" :readonly="true">
      <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
    </t-steps>
  </div>
  <div class="step-demo">
    <t-steps v-model="current2" :readonly="true">
      <t-step title="已完成步骤"></t-step>
      <t-step title="当前步骤"></t-step>
      <t-step title="未完成步骤"></t-step>
      <t-step title="未完成步骤"></t-step>
    </t-steps>
    <t-steps v-model="current2" :readonly="true">
      <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="当前步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
    </t-steps>
    <t-steps v-model="current2" :readonly="true">
      <t-step title="已完成步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="错误步骤" content="辅助信息文字最多两行" status="error"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
      <t-step title="未完成步骤" content="辅助信息文字最多两行"></t-step>
    </t-steps>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(0);
const current1 = ref(1);
const current2 = ref(1);
</script>
