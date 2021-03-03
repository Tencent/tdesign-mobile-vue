<template>
  <t-rate v-model="value" readonly />
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      value: ref(3.5),
    };
  },
});
</script>
