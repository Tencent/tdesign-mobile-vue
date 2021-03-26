<template>
  <div>
    <div class="badge-wrap">
      <t-badge :count="12" :max-count="44" class="badge-item">
        <t-button size="small">14</t-button>
      </t-badge>
      <t-badge :count="109" class="badge-item">
        <t-button size="small">默认max：99</t-button>
      </t-badge>
      <t-badge :count="45" :max-count="44" class="badge-item">
        <t-button size="small">max:44</t-button>
      </t-badge>
      <t-badge :count="106" :max-count="105" class="badge-item">
        <t-button size="small">max:105</t-button>
      </t-badge>
    </div>
    <div class="badge-wrap">
      <t-cell-group>
        <t-cell value-align="left">
          <span>单行标题</span>
          <t-badge :count="16" :offset="[10, 0]" class="list-item-badge"/>
        </t-cell>
      </t-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.badge-wrap {
  padding: 10px 0;

  .badge-item {
    margin-right: 20px;
  }
}
.list-item-badge {
  float: right;
  vertical-align: middle;
}
</style>
