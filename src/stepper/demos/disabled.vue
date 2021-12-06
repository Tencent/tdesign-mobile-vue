<template>
  <div class="cell-base">
    <t-cell-group title="禁用状态">
      <t-stepper v-model.number="number" label="失效" :step="1" :min="0" :max="100" disabled />
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    return {
      number: ref(0),
    };
  },
});
</script>
