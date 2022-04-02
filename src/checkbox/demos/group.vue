<template>
  <div>
    <t-checkbox-group v-model:value="checkBox1" @change="changeFn">
      <t-checkbox name="checkbox1" value="1" label="多选"></t-checkbox>
      <t-checkbox name="checkbox1" value="2" label="多选"></t-checkbox>
      <t-checkbox name="checkbox1" value="3" label="多选"></t-checkbox>
    </t-checkbox-group>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, h } from 'vue';

export default defineComponent({
  setup() {
    const checkBox1 = ref(['1', '2']);
    const changeFn = (value: any, context: { e: Event }) => {
      console.log('value:', value);
      console.log('Event:', context);
    };
    return {
      checkBox1,
      changeFn,
    };
  },
});
</script>
