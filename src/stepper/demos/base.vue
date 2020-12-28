<template>
  <div class="cell-base">
    <t-cell-group title="基础步进器">
      <t-stepper
        v-model.number="number1"
        label="标题文字"
        :step="1"
        :min="0"
        :max="100"
        :input-width="70"
        @change="onChange"
      />
      <t-stepper v-model.number="number2" label="标题文字" :step="1" :min="0" :max="9999" @change="onChange" />
      <t-stepper v-model.number="number3" label="禁用" :step="1" :min="0" :max="9999" disabled />
    </t-cell-group>
    <t-cell-group title="带单位步进器">
      <t-stepper v-model.number="number4" label="标题文字（单位）" :step="1" :min="0" :max="100" />

      <t-stepper v-model.number="number5" label="禁用（单位）" :step="1" :min="0" :max="100" disabled />
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-stepper-demo`;

export default defineComponent({
  name,
  setup() {
    const state = reactive({
      number1: 10,
      number2: 9999,
      number3: 0,
      number4: 0,
      number5: 0,
    });
    const onChange = ($event: number) => {
      console.log(`change to ${$event}`);
    };
    return {
      onChange,
      ...toRefs(state),
    };
  },
});
</script>
