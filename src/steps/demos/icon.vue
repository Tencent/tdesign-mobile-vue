<template>
  <div class="step-demo">
    <t-steps v-model="current" :readonly="false">
      <t-step title="步骤描述">
        <template #icon>
          <t-icon name="user"></t-icon>
        </template>
      </t-step>
      <t-step title="步骤描述">
        <template #icon>
          <t-icon name="location"></t-icon>
        </template>
      </t-step>
      <t-step title="步骤描述">
        <template #icon>
          <t-icon name="time"></t-icon>
        </template>
      </t-step>
    </t-steps>
    <t-steps v-model="current1" :readonly="false">
      <t-step title="步骤描述" content="辅助信息文字最多两行">
        <template #icon>
          <t-icon name="user"></t-icon>
        </template>
      </t-step>
      <t-step title="步骤描述" content="辅助信息文字最多两行">
        <template #icon>
          <t-icon name="location"></t-icon>
        </template>
      </t-step>
      <t-step title="步骤描述" content="辅助信息文字最多两行">
        <template #icon>
          <t-icon name="time"></t-icon>
        </template>
      </t-step>
    </t-steps>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon as TIcon } from 'tdesign-icons-vue-next';

const current = ref(1);
const current1 = ref(1);
</script>
