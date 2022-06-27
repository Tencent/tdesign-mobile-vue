<template>
  <div>
    <t-checkbox-group v-model:value="checkBox" class="checkbox-group-demo" @change="checkgroupChange">
      <t-checkbox name="checkbox1" value="1" label="多选"></t-checkbox>
      <t-checkbox name="checkbox1" value="2" label="多选"></t-checkbox>
      <t-checkbox name="checkbox1" value="3" label="多选"></t-checkbox>
      <t-checkbox
        name="checkbox1"
        value="4"
        :max-label-row="2"
        label="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多"
      ></t-checkbox>
      <t-checkbox
        name="checkbox1"
        value="5"
        label="多选"
        :max-content-row="2"
        content="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多"
      ></t-checkbox>
    </t-checkbox-group>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';

const checkBox = ref(['2', '3']);

watch(
  () => checkBox.value,
  (val) => {
    console.log('checkBox:', val);
  },
);

const checkgroupChange = (value: any, context: { e: Event }) => {
  console.log('value:', value);
  console.log('Event:', context);
};
</script>
<style lang="less" scoped>
.checkbox-group-demo {
  background: #fff;
}
</style>
