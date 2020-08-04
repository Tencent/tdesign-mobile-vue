<template>
  <div class="cell-base">
    <t-cell-group title="带刻度滑动选择器">
      <t-cell label="选择器标题">
        <t-slider v-model="value" :marks="marks">
        </t-slider>
      </t-cell>
      <t-cell label="禁用选择器">
        <t-slider v-model="value" disabled :marks="marks">
        </t-slider>
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const value = ref(50);
    const marks = ref({ 0: '小', 50: '中', 100: '大' });
    return {
      value,
      marks,
    };
  },
};
</script>
