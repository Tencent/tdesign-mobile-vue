<template>
  <div class="cell-base">
    <t-cell-group>
      <t-cell>
        <t-progress :percentage="30" />
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
