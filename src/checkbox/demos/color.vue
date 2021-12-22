<template>
  <div>
    <t-checkbox v-model="checked1" name="1" title="单行标题" checked-color="#07c160"> </t-checkbox>
    <t-checkbox v-model="checked2" name="1" title="单行标题" checked-color="#07c160"> </t-checkbox>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from 'vue';

export default defineComponent({
  setup() {
    const checked1 = ref('1');
    const checked2 = ref('2');

    watch(
      () => checked1.value,
      (val) => {
        console.log(val);
      },
    );
    watch(
      () => checked2.value,
      (val) => {
        console.log(val);
      },
    );

    return {
      checked1,
      checked2,
    };
  },
});
</script>
