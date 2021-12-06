<template>
  <div class="cell-base">
    <t-cell-group title="基础开关">
      <t-cell label="标题">
        <t-switch v-model="checked" @change="onChange"> </t-switch>
      </t-cell>
      <t-cell label="标题">
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
    function onChange($event) {
      console.log(`change to ${$event}`);
    }
    return {
      checked,
      onChange,
    };
  },
});
</script>
