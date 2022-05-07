<template>
  <div>
    <tdesign-demo-block title="01 类型" summary="基础进度条">
      <div class="progress-demo progress-demo--margin">
        <t-progress :percentage="0" />
      </div>
      <div class="progress-demo progress-demo--margin">
        <t-progress :percentage="88" />
      </div>
      <div class="progress-demo progress-demo--margin">
        <t-progress :percentage="100" />
      </div>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseDemo',
});
</script>

<style lang="less" scoped>
.progress-demo {
  padding: 8px 16px;
  background-color: #fff;
}
.progress-demo--margin:not(:last-child) {
  margin-bottom: 16px;
}
</style>
