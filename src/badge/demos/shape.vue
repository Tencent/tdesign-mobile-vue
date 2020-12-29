<template>
  <div class="badge-wrap">
    <t-badge :count="12" class="badge-item">
      <t-button size="small">circle</t-button>
    </t-badge>
    <t-badge :count="12" shape="round" class="badge-item">
      <t-button size="small">round</t-button>
    </t-badge>
    <t-badge content="NEW" shape="ribbon" :offset="[6, 0]" class="badge-item">
      <div class="ribbon-line">
        绸带badge
      </div>
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

.ribbon-line {
  height: 40px;
  width: 300px;
  background-color: #dddddd;
}
</style>
