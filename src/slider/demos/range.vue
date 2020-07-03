<template>
  <div class="cell-base">
    <t-cell-group title="区间滑动选择器">
      <t-cell label="选择器标题">
        <t-slider v-model="rangeValue" showValue range @change="onChange">
        </t-slider>
      </t-cell>
      <t-cell label="禁用选择器">
        <t-slider v-model="rangeValue" range disabled>
        </t-slider>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-slider-base-demo`;

export default {
  name,
  setup() {
    const rangeValue = ref([30, 70]);
    function onChange($event:number|number[]) {
      console.log(`change to ${$event}`);
    }
    return {
      rangeValue,
      onChange,
    };
  },
};
</script>
