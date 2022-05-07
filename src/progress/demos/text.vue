<template>
  <div>
    <tdesign-demo-block title="03 规格" summary="带数值进度条">
      <div class="progress-demo">
        <t-progress :percentage="88" />
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="无数值进度条">
      <div class="progress-demo">
        <t-progress :percentage="88" :label="false" />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextDemo',
});
</script>

<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
}
</style>
