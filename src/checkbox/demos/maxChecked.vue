<template>
  <div>
    <t-check-group v-model="checkBoxs" max="2">
      <t-checkbox name="1" title="复选框1"></t-checkbox>
      <t-checkbox name="2" title="复选框2"></t-checkbox>
      <t-checkbox name="3" title="复选框3"></t-checkbox>
    </t-check-group>
  </div>
</template>
<script>
import { ref, defineComponent, watch } from 'vue';
export default defineComponent({
  setup() {
    const checkBoxs = ref(['1']);

    watch(() => checkBoxs.value, (val) => {
      console.log(Array.from(val));
    });

    return {
      checkBoxs,
    };
  },
});
</script>
