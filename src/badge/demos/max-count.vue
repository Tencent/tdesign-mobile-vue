<template>
  <div class="badge-wrap">
    <t-badge :count="12" class="badge-item">
      <t-button size="small">12</t-button>
    </t-badge>
    <t-badge :count="104" class="badge-item">
      <t-button size="small">104</t-button>
    </t-badge>
    <t-badge :count="104" :max-count="44" class="badge-item">
      <t-button size="small">max:44</t-button>
    </t-badge>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.badge-wrap {
  padding: 20px 0;

  .badge-item {
    margin: 0 20px;
  }
}
</style>
