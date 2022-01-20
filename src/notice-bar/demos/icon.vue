<template>
  <div class="noticebar-demo">
    <t-cell-group>
      <t-cell value-align="left">
        <t-notice-bar content="提示文字描述提示文字描述提示文字描述" />
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
        />
        <t-notice-bar type="error" content="提示文字描述提示文字描述提示文字描述" />
        <t-notice-bar
          type="error"
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
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

<style lang="less" scoped>
.noticebar-demo {
  background-color: #f5f5f5;

  .t-cell {
    background-color: transparent;
    padding: 0;
  }
}
</style>
