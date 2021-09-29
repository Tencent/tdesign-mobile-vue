<template>
  <div class='tdesign-mobile-demo'>

    <t-cell-group>
      <div class='badge-demo'>
        <div class='badge-item'>
          <t-badge :count='12' class='badge-item'>
            <t-button size='small'>按钮</t-button>
          </t-badge>
          <t-badge :count='999' color='#52c41a' class='badge-item'>
            <t-button size='small'>绿色</t-button>
          </t-badge>
          <t-badge :count='1' color='#f52fff' class='badge-item'>
            <t-button size='small'>自定义颜色</t-button>
          </t-badge>
        </div>
      </div>
    </t-cell-group>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

