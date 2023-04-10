<template>
  <div :style="style">
    <div class="input-example__label">标签文字</div>
    <t-input :style="style2" placeholder="请输入文字">
      <template #suffixIcon>
        <error-circle-filled-icon />
      </template>
    </t-input>
  </div>
</template>

<script lang="ts" setup>
import { ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';

const style = '--td-input-vertical-padding: 12px; background-color: #fff; padding: 16px 16px 8px;';
const style2 = 'border: 1px solid rgba(220,220,220,1); border-radius: 6px;';
</script>

<style lang="less">
.input-example__label {
  color: rgba(0, 0, 0, 0.9);
  font-size: 12px;
  line-height: 20px;
  margin: 0 4px 8px;
}
</style>
