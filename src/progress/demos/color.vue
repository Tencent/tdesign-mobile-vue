<template>
  <div class="cell-base">
    <t-cell-group title="自定义样式">
      <t-cell>
        <t-progress
          :percentage="50"
          color="#FF00FF"
          bgColor="#000000"
          textColor="#00FFFF"
        />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-progress-demo`;

export default defineComponent({
  name,
  setup() {
    return {};
  },
});
</script>
