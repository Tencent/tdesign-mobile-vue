<template>
  <div class="notice-bar-base">
    <t-cell-group title="公告栏 - 自定义图标">
      <t-cell value-align="left">
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述" leftIcon="apple"
        />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>
