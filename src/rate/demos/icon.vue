<template>
  <t-rate v-model="value" clearable show-text allow-half>
    <template #icon>
      <t-icon name="user-filled" />
    </template>
  </t-rate>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      value: ref(1),
    };
  },
});
</script>
