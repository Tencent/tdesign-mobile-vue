<template>
  <div class="step-demo">
    <t-steps v-model="current" layout="vertical" :readonly="true">
      <t-step title="已完成步骤"></t-step>
      <t-step title="当前步骤"></t-step>
      <t-step title="未完成步骤"></t-step>
    </t-steps>
    <t-steps v-model="current" layout="vertical" :readonly="true">
      <t-step title="已完成步骤"></t-step>
      <t-step title="错误步骤" status="error"></t-step>
      <t-step title="未完成步骤"></t-step>
    </t-steps>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const current = ref(1);
</script>
<style lang="less" scoped>
.demo-steps {
  padding-top: 12px;
}
</style>
