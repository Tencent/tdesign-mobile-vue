<template>
  <t-rate v-model="value" size="36px" allow-half clearable />
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      value: ref(3),
    };
  },
});
</script>
