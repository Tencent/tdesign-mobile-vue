<template>
  <div class="cell-base">
    <t-cell-group title="基础步进器">
      <t-stepper v-model.number="number" label="标题文字" :step="1" :min="0" :max="100"/>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    return {
      number: ref(10),
    };
  },
});
</script>
