<template>
  <div>
    <t-check-group v-model="checked">
      <t-checkbox name="1" title="单行标题"></t-checkbox>
      <t-checkbox name="2" title="单行标题"></t-checkbox>
      <t-checkbox name="3" title="单行标题"></t-checkbox>
    </t-check-group>
  </div>
</template>
<script>
import { ref, defineComponent, watch } from 'vue';
export default defineComponent({
  setup() {
    const checked = ref(['1']);

    watch(() => checked.value, (val) => {
      console.log(val);
    });

    return {
      checked,
    };
  },
});
</script>
