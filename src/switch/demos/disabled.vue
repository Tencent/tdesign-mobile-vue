<template>
  <div class="">
    <t-cell-group>
      <t-cell title="开关开启禁用">
        <template #rightIcon>
          <t-switch v-model="value" disabled> </t-switch>
        </template>
      </t-cell>
      <t-cell title="开关关闭禁用">
        <template #rightIcon>
          <t-switch disabled></t-switch>
        </template>
      </t-cell>
      <t-cell title="开关开启禁用">
        <template #rightIcon>
          <t-switch v-model="value" disabled label="描述信息"> </t-switch>
        </template>
      </t-cell>
      <t-cell title="开关关闭禁用">
        <template #rightIcon>
          <t-switch label="描述信息" disabled></t-switch>
        </template>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
