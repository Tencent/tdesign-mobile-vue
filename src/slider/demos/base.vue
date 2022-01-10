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
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const value = ref(60);
    function onChange($event: number | number[]) {
      console.log(`change to ${$event}`);
    }
    return {
      value,
      onChange,
    };
  },
});
</script>
