<template>
  <div class="tdesign-mobile-demo">
    <t-cell-group>
      <div class="badge-demo">
        <div class="badge-item">
          <t-badge :count="16">消息</t-badge>
        </div>
        <div class="badge-item">
          <t-badge dot>消息</t-badge>
        </div>
        <div class="badge-item">
          <t-badge content="NEW">消息</t-badge>
        </div>
        <div class="badge-item">
          <t-badge content="···">消息</t-badge>
        </div>
      </div>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
