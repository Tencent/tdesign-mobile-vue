<template>
  <div class="stepper-demo">
    <t-cell title="禁用">
      <t-stepper v-model="number1" :step="1" :min="0" :max="100" disabled />
    </t-cell>
  </div>

  <div class="stepper-demo">
    <t-cell title="禁止输入">
      <t-stepper v-model="number2" :step="1" :min="0" :max="100" disable-input />
    </t-cell>
  </div>

  <div class="stepper-demo">
    <t-cell title="最大值">
      <t-stepper v-model="number3" :step="1" :min="0" :max="999" />
    </t-cell>
  </div>

  <div class="stepper-demo">
    <t-cell title="最小值">
      <t-stepper v-model="number4" :step="1" :min="0" :max="999" />
    </t-cell>
  </div>

  <div class="stepper-inline-demo" style="display: flex; margin: 21px 0; background-color: #fff">
    <t-stepper v-model="number5" theme="grey" :step="1" :min="0" :max="100" disabled />
    <t-stepper v-model="number6" theme="grey" :step="1" :min="0" :max="100" />
    <t-stepper v-model="number7" theme="grey" :step="1" :min="0" :max="999" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const number1 = ref(0);
const number2 = ref(0);
const number3 = ref(999);
const number4 = ref(0);
const number5 = ref(3);
const number6 = ref(0);
const number7 = ref(999);
</script>
