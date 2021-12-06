<template>
  <div class="cell-base">
    <t-cell-group title="区间滑动选择器">
      <t-cell label="选择器标题">
        <t-slider v-model="rangeValue" show-value range @change="onChange"> </t-slider>
      </t-cell>
      <t-cell label="禁用选择器">
        <t-slider v-model="rangeValue" range disabled> </t-slider>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const rangeValue = ref([30, 80]);
    function onChange($event: number | number[]) {
      console.log(`change to ${$event}`);
    }
    return {
      rangeValue,
      onChange,
    };
  },
});
</script>
