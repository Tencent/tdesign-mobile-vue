<template>
  <div class="cell-base">
    <t-cell-group title="禁用状态">
      <t-cell title="失效">
        <t-stepper v-model.number="number" :step="1" :min="0" :max="100" disabled />
      </t-cell>
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
