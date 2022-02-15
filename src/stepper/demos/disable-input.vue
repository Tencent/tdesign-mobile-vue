<template>
  <div class="cell-base">
    <t-cell-group title="禁止输入">
      <t-cell title="禁止输入">
        <t-stepper v-model.number="number" :step="1" :min="0" :max="100" disable-input />
      </t-cell>
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
