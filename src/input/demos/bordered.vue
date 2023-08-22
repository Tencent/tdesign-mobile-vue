<template>
  <div class="input-demo">
    <div class="input-demo__summary">标签文字</div>
    <t-input class="custom-input" placeholder="请输入文字" borderless>
      <template #suffixIcon>
        <error-circle-filled-icon />
      </template>
    </t-input>
  </div>
</template>

<script lang="ts" setup>
import { ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
</script>

<style lang="less" scoped>
.input-demo {
  background-color: var(--bg-color-demo, #fff);
  padding: 16px 16px 24px;

  --td-input-vertical-padding: 12px;
}

.input-demo__summary {
  color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 8px;
}

.custom-input {
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 6px;
}
</style>
