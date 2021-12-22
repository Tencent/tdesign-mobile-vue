<template>
  <t-rate v-model="value" color="#0052d9" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value: ref(5),
    };
  },
});
</script>
