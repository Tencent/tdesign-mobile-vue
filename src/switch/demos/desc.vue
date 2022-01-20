<template>
  <div class="cell-base">
    <t-cell-group title="带描述开关">
      <t-cell title="标题">
        <t-switch v-model="checked" label="描述信息"> </t-switch>
      </t-cell>
      <t-cell title="标题">
        <t-switch label="描述信息"> </t-switch>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const checked = ref(true);
    const disabledValue = ref(true);
    return {
      checked,
      disabledValue,
    };
  },
});
</script>
