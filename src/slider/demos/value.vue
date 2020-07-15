<template>
  <div class="cell-base">
    <t-cell-group title="带数字滑动选择器">
      <t-cell label="选择器标题">
        <t-slider v-model="value" showValue>
        </t-slider>
      </t-cell>
      <t-cell label="禁用选择器">
        <t-slider v-model="value" disabled showValue>
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
    const value = ref(60);
    return {
      value,
    };
  },
};
</script>
