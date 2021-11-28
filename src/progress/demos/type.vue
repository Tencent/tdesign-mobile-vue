<template>
  <div class="cell-base">
    <t-progress type="info" :percentage="50" />
    <t-progress type="error" :percentage="88" />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import config from '@/config';
const { prefix } = config;
const name = `${prefix}-progress-demo`;

export default defineComponent({
  name,
  setup() {
    const value = ref(true);
    const disabledValue = ref(true);
    const checked = ref(true);
    function onChange($event: string | number | boolean) {
      console.log(`change to ${$event}`);
    }
    return {
      value,
      disabledValue,
      checked,
      onChange,
    };
  },
});
</script>
