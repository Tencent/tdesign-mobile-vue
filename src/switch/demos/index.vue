<template>
  <div class="cell-base">
    <t-cell-group title="基础开关">
      <t-cell title="标题">
        <t-switch v-model="checked"> </t-switch>
      </t-cell>
      <t-cell title="标题">
        <t-switch></t-switch>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const checked = ref(true);
    return {
      checked,
    };
  },
});
</script>
