<template>
  <div class="cell-base">
    <t-cell-group title="进度条">
      <t-cell>
        <t-progress :percentage="30" showText />
      </t-cell>
    </t-cell-group>

    <t-cell-group title="进度条">
      <t-cell>
        <t-progress showText />
        <t-progress :percentage="88" showText />
        <t-progress :percentage="100" showText />
        <t-progress :percentage="50" showText color="#ff3e00" />
      </t-cell>
    </t-cell-group>

    <t-cell-group title="进度条">
      <t-cell>
        <t-progress />
        <t-progress :percentage="88" />
        <t-progress :percentage="100" />
        <t-progress :percentage="50" color="#ff3e00" />
      </t-cell>
    </t-cell-group>

  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-progress-demo`;

export default {
  name,
  setup() {
    const value = ref(true);
    const disabledValue = ref(true);
    const checked = ref(true);
    function onChange($event:string|number|boolean) {
      console.log(`change to ${$event}`);
    }
    return {
      value,
      disabledValue,
      checked,
      onChange,
    };
  },
};
</script>
