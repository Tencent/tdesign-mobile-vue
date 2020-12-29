<template>
  <div>
    <t-checkbox
      v-model="checked1"
      name="1"
      title="复选框1"
      disabled>
    </t-checkbox>
    <t-checkbox
      v-model="checked2"
      name="1"
      title="复选框2"
      disabled>
    </t-checkbox>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const checked1 = ref('1');
    const checked2 = ref('2');

    return {
      checked1,
      checked2,
    };
  },
});
</script>
