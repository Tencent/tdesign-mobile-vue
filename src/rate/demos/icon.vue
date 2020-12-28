<template>
  <t-rate v-model="value" clearable show-text allow-half>
    <template #icon>
      <t-icon name="apple" />
    </template>
  </t-rate>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      value: ref(1),
    };
  },
});
</script>
