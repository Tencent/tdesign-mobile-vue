<template>
  <div class="cell-base">
    <t-cell-group title="禁用开关">
      <t-cell label="标题">
        <t-switch v-model="disabledValue" disabled> </t-switch>
      </t-cell>
      <t-cell label="标题">
        <t-switch disabled text="描述信息"> </t-switch>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const disabledValue = ref(true);
    function onChange($event) {
      console.log(`change to ${$event}`);
    }
    return {
      disabledValue,
      onChange,
    };
  },
});
</script>
