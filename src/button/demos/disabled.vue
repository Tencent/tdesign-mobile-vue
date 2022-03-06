<template>
  <div>
    <div class="tdesign-demo-block">
      <t-button disabled>主要按钮</t-button>
      <t-button variant="outline" disabled>次要按钮</t-button>
      <t-button theme="danger" disabled>警告按钮</t-button>
      <t-button ghost disabled>幽灵按钮</t-button>
      <t-button variant="text" disabled>文本按钮</t-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
