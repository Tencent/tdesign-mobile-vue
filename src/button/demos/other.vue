<template>
  <div style="background: #a6a6a6; padding: 8px 16px; margin-bottom: 16px">
    <t-button size="large" variant="outline" ghost block :disabled="disabled"> 幽灵按钮 </t-button>
  </div>
  <div class="margin-button">
    <t-button size="large" theme="primary" variant="text" block :disabled="disabled"> 文字按钮 </t-button>
  </div>
  <div class="no-border-radius margin-button">
    <t-button size="large" theme="primary" block :disabled="disabled"> 通栏按钮 </t-button>
  </div>
  <div class="no-border-radius no-border flex margin-button">
    <t-button size="large" variant="outline" block :disabled="disabled">次按钮</t-button>
    <t-button size="large" theme="primary" block :disabled="disabled">主按钮</t-button>
  </div>
</template>
<script lang="ts" setup>
import { toRefs, defineProps, h } from 'vue';

const props = defineProps({
  disabled: Boolean,
});

const { disabled } = toRefs(props);
</script>
