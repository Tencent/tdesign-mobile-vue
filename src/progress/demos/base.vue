<template>
  <div class="cell-base">
    <t-cell-group title="基础进度条">
      <t-cell>
        <t-progress :percentage="0" />
      </t-cell>
      <t-cell>
        <t-progress :percentage="30" />
      </t-cell>
       <t-cell>
         <t-progress :percentage="100" />
      </t-cell>
      <t-cell>
         <t-progress type="error" :percentage="88" />
      </t-cell>
    </t-cell-group>
    <t-cell-group title="隐藏数值进度条">
      <t-cell>
        <t-progress :percentage="0" :show-text="false" />
      </t-cell>
      <t-cell>
        <t-progress :percentage="30" :show-text="false" />
      </t-cell>
      <t-cell>
        <t-progress :percentage="100" :show-text="false" />
      </t-cell>
      <t-cell>
        <t-progress type="error" :percentage="88" :show-text="false" />
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
