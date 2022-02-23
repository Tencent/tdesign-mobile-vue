<template>
  <div class="cell-base">
    <t-cell-group title="绑定事件">
      <t-cell title="标题文字">
        <t-stepper
          v-model.number="number"
          :step="1"
          :min="0"
          :max="100"
          :input-width="70"
          @overlimit="onOverlimit"
          @change="onChange"
          @blur="onBlur"
        />
      </t-cell>
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
    const onBlur = ($event: number) => {
      console.log(`onBlur to ${$event}`);
    };
    return {
      number: ref(10),
      onChange,
      onBlur,
    };
  },
});
</script>
