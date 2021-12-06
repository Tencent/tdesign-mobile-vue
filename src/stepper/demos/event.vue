<template>
  <div class="cell-base">
    <t-cell-group title="绑定事件">
      <t-stepper
        v-model.number="number"
        label="标题文字"
        :step="1"
        :min="0"
        :max="100"
        :input-width="70"
        @change="onChange"
      />
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const onChange = ($event: number) => {
      console.log(`change to ${$event}`);
    };
    return {
      number: ref(10),
      onChange,
    };
  },
});
</script>
