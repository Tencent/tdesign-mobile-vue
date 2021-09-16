<template>
  <div class="noticebar-demo">
    <t-cell-group>
      <t-cell value-align="left">
        <t-notice-bar
          content="提示文字描述提示文字描述"
          mode="text"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          mode="text"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述"
          mode="text"
          type="error"
        />
        <t-notice-bar
          content="提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述提示文字描述"
          mode="text"
          type="error"
        />
      </t-cell>
    </t-cell-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.noticebar-demo {
  background-color:#F5F5F5;

  .t-cell {
    background-color:transparent;
    padding:0;
  }
}
</style>
