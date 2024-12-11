<template>
  <div class="example-search">
    <t-search
      v-model="value1"
      placeholder="搜索预设文案"
      @change="onChange"
      @blur="onBlur"
      @clear="onClear"
      @focus="onFocus"
      @submit="onSubmit"
      @action-click="onActionClick"
    ></t-search>
  </div>
  <div class="example-search">
    <t-search
      v-model="value2"
      placeholder="输入tdesign，有预览效果"
      @change="onChange"
      @blur="onBlur"
      @clear="onClear"
      @focus="onFocus"
      @submit="onSubmit"
      @action-click="onActionClick"
    ></t-search>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value1 = ref('');
const value2 = ref('');

const onChange = (val: string) => {
  console.log('change: ', val);
};
const onBlur = () => {
  console.log('blur');
};
const onClear = () => {
  console.log('clear');
};
const onFocus = () => {
  console.log('focus');
};
const onSubmit = () => {
  console.log('submit');
};
const onActionClick = () => {
  console.log('action-click');
};
</script>
<style lang="less">
.example-search {
  background-color: var(--bg-color-demo, #fff);
  padding: 8px 16px;
}
</style>
