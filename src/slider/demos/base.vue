<template>
  <div class="cell-base">
    <t-cell-group title="基础滑动选择器">
      <t-cell label="选择器标题">
        <t-slider v-model="value" @change="onChange"> </t-slider>
      </t-cell>
      <t-cell label="禁用选择器">
        <t-slider v-model="value" disabled> </t-slider>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="带数字滑动选择器">
      <t-cell label="选择器标题">
        <t-slider v-model="value1" show-value> </t-slider>
      </t-cell>
      <t-cell label="禁用选择器">
        <t-slider v-model="value1" disabled show-value> </t-slider>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="带刻度滑动选择器">
      <t-cell label="选择器标题">
        <t-slider v-model="value2" :marks="marks"> </t-slider>
      </t-cell>
      <t-cell label="禁用选择器">
        <t-slider v-model="value2" disabled :marks="marks"> </t-slider>
      </t-cell>
    </t-cell-group>
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
    const value = ref(60);
    const value1 = ref(60);
    const value2 = ref(50);
    const marks = ref({ 0: '小', 50: '中', 100: '大' });
    const rangeValue = ref([30, 70]);
    function onChange($event: number | number[]) {
      console.log(`change to ${$event}`);
    }
    return {
      value,
      value1,
      value2,
      rangeValue,
      marks,
      onChange,
    };
  },
});
</script>
