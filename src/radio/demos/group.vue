<template>
  <div>
    <t-radio-group v-model="radio" @change="change">
      <t-radio name="1" title="苹果"></t-radio>
      <t-radio name="2" title="西瓜"></t-radio>
      <t-radio name="3" title="香蕉"></t-radio>
      <t-radio name="4" title="桃子"></t-radio>
      <t-radio name="5" title="雪梨" disabled></t-radio>
    </t-radio-group>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  setup() {
    const radio = ref('1');

    watch(
      () => radio.value,
      (val) => {
        console.log(val);
      },
    );

    return {
      radio,
      change: val => console.log(val),
    };
  },
});
</script>
