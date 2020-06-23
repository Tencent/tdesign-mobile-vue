<template>
  <div class="cell-base">

    <t-cell-group title="步进器">
      <t-cell label="标准">
        <t-stepper  v-model.number="number1" :step="10" :min="10" :max="100" @change="onChange"/>
      </t-cell>
      <t-cell label="disabled">
        <t-stepper disabled/>
      </t-cell>
      <t-cell label="测试">
        <t-stepper  v-model.number="number2"/>
      </t-cell>
      <t-cell label="不可输入">
        <t-stepper  v-model.number="number3" disableInput/>
      </t-cell>
    </t-cell-group>

  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-stepper-demo`;

export default {
  name,
  setup() {
    const number1 = ref(0);
    const number2 = ref(3);
    const number3 = ref(10);
    function onChange($event:string|number|boolean) {
      console.log(`change to ${$event}`);
    }
    return {
      number1,
      number2,
      number3,
      onChange,
    };
  },
};
</script>
