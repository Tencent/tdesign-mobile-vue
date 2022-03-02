<template>
  <div>
    <t-check-group v-model:value="checkBoxs1" @change="changeFn">
      <t-checkbox name="checkbox1" value="1" label="多选"></t-checkbox>
      <t-checkbox name="checkbox1" value="2" label="多选"></t-checkbox>
      <t-checkbox name="checkbox1" value="3" label="多选"></t-checkbox>
    </t-check-group>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, h } from 'vue';

export default defineComponent({
  setup() {
    const checkBoxs1 = ref(['1', '2']);
    const changeFn = (value: any, context: { e: Event }) => {
      console.log('value:', value);
      console.log('Event:', context);
    };
    return {
      checkBoxs1,
      changeFn,
    };
  },
});
</script>
