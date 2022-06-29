<template>
  <div>
    <t-checkbox-group v-model:value="checkBox" class="checkbox-group-demo" @change="checkgroupChange">
      <t-checkbox name="checkbox2" value="1" label="多选" align="right" :icon="circleFilledIcons"></t-checkbox>
      <t-checkbox name="checkbox2" value="2" label="多选" align="right" :icon="circleFilledIcons"></t-checkbox>
      <t-checkbox name="checkbox2" value="3" label="多选" align="right" :icon="circleFilledIcons"></t-checkbox>
      <t-checkbox
        name="checkbox2"
        value="4"
        :max-label-row="1"
        label="多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多选多"
        align="right"
        :icon="circleFilledIcons"
      ></t-checkbox>
    </t-checkbox-group>
  </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { CheckCircleFilledIcon, CircleIcon, CheckRectangleFilledIcon, RectangleIcon } from 'tdesign-icons-vue-next';

const checkBox = ref(['2', '3']);

const TIconCircleFilled = h(CheckCircleFilledIcon);
const TIconCircle = h(CircleIcon);
const circleFilledIcons = [TIconCircleFilled, TIconCircle];

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
