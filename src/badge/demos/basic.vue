<template>
  <div class="badge-wrap">
    <t-badge :count="12" class="badge-item">
      <t-button size="small">按钮</t-button>
    </t-badge>
    <t-badge dot class="badge-item">
      <t-button size="small">小红点</t-button>
    </t-badge>
    <t-badge content="NEW" class="badge-item">
      <t-button size="small">NEW</t-button>
    </t-badge>
    <t-badge content="···" class="badge-item">
      <t-button size="small">省略号</t-button>
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
