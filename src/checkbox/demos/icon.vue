<template>
  <div>
    <t-checkbox-group v-model="checkBox" class="checkbox-group-demo" @change="checkgroupChange">
      <t-checkbox
        name="checkbox6"
        value="1"
        label="多选"
        :icon="CheckRectangleFilledIcons"
        :on-change="checkboxChange"
      ></t-checkbox>
      <t-checkbox
        name="checkbox6"
        value="2"
        label="多选"
        :icon="CheckRectangleFilledIcons"
        :on-change="checkboxChange"
      ></t-checkbox>
      <t-checkbox
        name="checkbox6"
        value="3"
        label="多选"
        :icon="CheckRectangleFilledIcons"
        :on-change="checkboxChange"
      ></t-checkbox>
    </t-checkbox-group>
  </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { CheckRectangleFilledIcon, RectangleIcon } from 'tdesign-icons-vue-next';

const checkBox = ref(['2', '3']);
const TCheckRectangleFilledIcon = h(CheckRectangleFilledIcon);
const TRectangleIcon = h(RectangleIcon);
const CheckRectangleFilledIcons = [TCheckRectangleFilledIcon, TRectangleIcon];

const checkgroupChange = (value: any, context: { e: Event }) => {
  console.log('value:', value);
  console.log('Event:', context);
};
const checkboxChange = (check: boolean, context: { e: Event }) => {
  console.log('check: ', check);
  console.log('context: ', context);
};
</script>
<style lang="less" scoped>
.checkbox-group-demo {
  background: #fff;
}
</style>
