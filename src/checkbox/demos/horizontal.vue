<template>
  <t-checkbox-group class="box" borderless :default-value="demoCheckboxMax" @change="checkboxGroupChange">
    <t-checkbox :block="false" value="checkbox1" label="多选标题" />
    <t-checkbox :block="false" value="checkbox2" label="多选标题" />
    <t-checkbox :block="false" value="checkbox3" label="上限四字" />
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
  display: flex;
  justify-content: space-between;
  background-color: #fff;
}
</style>
