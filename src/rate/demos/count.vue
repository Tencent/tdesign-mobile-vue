<template>
  <t-rate v-model="value" :count="6" allow-half clearable />
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value: ref(6),
    };
  },
});
</script>
