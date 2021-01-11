<template>
  <div class="badge-wrap">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.badge-wrap {
  padding: 20px 0;

  .badge-line {
    margin-bottom: 20px;
  }

  .badge-item {
    margin: 0 20px;
  }
}
</style>
