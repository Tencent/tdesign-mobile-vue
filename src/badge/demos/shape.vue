<template>
  <div class="badge-wrap">
    <t-badge :count="12" class="badge-item">
      <t-button size="small">circle</t-button>
    </t-badge>
    <t-badge :count="12" shape="round" class="badge-item">
      <t-button size="small">round</t-button>
    </t-badge>
    <t-cell-group title="列表带徽标">
      <t-cell label="单行标题">
        <t-badge dot />
      </t-cell>
      <t-cell label="单行标题">
        <t-badge content="NEW" :offset="[5, 0]" shape="ribbon" />
      </t-cell>
    </t-cell-group>
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
    margin-right: 20px;
  }
}
</style>
