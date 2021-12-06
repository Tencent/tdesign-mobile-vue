<template>
  <div class="tdesign-mobile-demo">
    <div class="badge-demo">
      <div class="badge-line">
        <span>offset: [10, 10]</span>
        <t-badge :count="12" :offset="[10, 10]" class="badge-item">
          <t-button size="small">按钮</t-button>
        </t-badge>
      </div>
      <div class="badge-line">
        <span>offset: [-10, 10]</span>
        <t-badge :count="12" :offset="[-10, 10]" class="badge-item">
          <t-button size="small">按钮</t-button>
        </t-badge>
      </div>
      <div class="badge-line">
        <span>offset: [-10, -10]</span>
        <t-badge :count="12" :offset="[-10, -10]" class="badge-item">
          <t-button size="small">按钮</t-button>
        </t-badge>
      </div>
      <div class="badge-line">
        <span>offset: [10, -10]</span>
        <t-badge :count="12" :offset="[10, -10]" class="badge-item">
          <t-button size="small">按钮</t-button>
        </t-badge>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
