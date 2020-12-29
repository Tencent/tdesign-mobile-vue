<template>
  <div class="badge-wrap">
    <t-badge :count="12" class="badge-item">
      <t-button size="small">按钮</t-button>
    </t-badge>
    <t-badge :count="999" color="#52c41a" class="badge-item">
      <t-button size="small">绿色</t-button>
    </t-badge>
    <t-badge :count="1" color="#f52fff" class="badge-item">
      <t-button size="small">自定义颜色</t-button>
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
