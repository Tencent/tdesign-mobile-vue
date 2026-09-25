<template>
  <t-checkbox-group
    class="box"
    borderless
    direction="horizontal"
    :default-value="demoCheckboxMax"
    @change="checkboxGroupChange"
  >
    <t-checkbox value="checkbox1" label="多选标题" />
    <t-checkbox value="checkbox2" label="多选标题" />
    <t-checkbox value="checkbox3" label="上限四字" />
  </t-checkbox-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const demoCheckboxMax = ref(['checkbox1', 'checkbox2']);

const checkboxGroupChange = (value: any, context: { e: Event }) => {
  console.log('value:', value);
  console.log('Event:', context);
};
</script>
<style lang="less" scoped>
.box {
  padding: 16px;
  background-color: var(--bg-color-demo, #fff);
}
</style>
