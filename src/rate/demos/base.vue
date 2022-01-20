<template>
  <t-rate v-model="value" />
  <!-- 允许清除 -->
  <t-rate v-model="value1" clearable />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value: ref(2),
      value1: ref(3),
    };
  },
});
</script>
