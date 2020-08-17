<template>
  <div class="cell-base">

    <t-cell-group title="基础步进器">
      <t-stepper label="标题文字" v-model.number="number1" :step="1" :min="0" :max="100"
                 :input-width="70" @change="onChange"/>
      <t-stepper  label="标题文字" v-model.number="number2" :step="1" :min="0" :max="9999"
                  @change="onChange"/>
      <t-stepper label="禁用" v-model.number="number3" :step="1" :min="0" :max="9999" disabled/>
    </t-cell-group>
    <t-cell-group title="带单位步进器">
      <t-stepper label="标题文字（单位）" v-model.number="number4" :step="1" :min="0" :max="100"/>

      <t-stepper label="禁用（单位）" v-model.number="number5" :step="1" :min="0" :max="100" disabled/>

    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-stepper-demo`;

export default {
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
};
</script>
