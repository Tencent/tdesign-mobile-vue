<template>
  <t-cell title="基础开关">
    <template #rightIcon>
      <t-switch :value="checked" @change="onChange"></t-switch>
    </template>
  </t-cell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const checked = ref(true);

const onChange = (val: any) => {
  checked.value = val;
};
</script>
