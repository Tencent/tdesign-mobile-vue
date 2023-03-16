<template>
  <div class="">
    <t-cell-group>
      <t-cell title="加载状态">
        <template #rightIcon>
          <t-switch v-model="value" disabled />
        </template>
      </t-cell>
      <t-cell title="加载状态">
        <template #rightIcon>
          <t-switch disabled />
        </template>
      </t-cell>
      <t-cell title="禁用状态">
        <template #rightIcon>
          <t-switch v-model="value" disabled />
        </template>
      </t-cell>
      <t-cell title="禁用状态">
        <template #rightIcon>
          <t-switch disabled />
        </template>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
