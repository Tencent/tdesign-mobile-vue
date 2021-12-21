<template>
  <div>
    <t-cell-group title="cell组合使用">
      <t-check-group v-model="checkBoxs">
        <t-cell value-align="left">
          <t-checkbox name="1" title="单行标题"> </t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox name="2" title="单行标题"></t-checkbox>
        </t-cell>
        <t-cell value-align="left">
          <t-checkbox name="3" title="单行标题"></t-checkbox>
        </t-cell>
      </t-check-group>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from 'vue';

export default defineComponent({
  setup() {
    const checkBoxs = ref(['1']);
    watch(
      () => checkBoxs.value,
      (val) => {
        console.log(Array.from(val));
      },
    );

    return { checkBoxs };
  },
});
</script>
