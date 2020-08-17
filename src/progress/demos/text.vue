<template>
  <div class="cell-base">
    <t-cell-group title="隐藏文本">
      <t-cell>
        <t-progress
          :percentage="50"
          :showText="false"
        />
      </t-cell>
      <t-cell>
        <t-progress
          type="error"
          :percentage="88"
          :showText="false"
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
