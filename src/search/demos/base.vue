<template>
  <div class="example-search">
    <t-search
      v-model="value"
      placeholder="请输入关键字"
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
const value = ref('');
</script>
<style lang="less">
.example-search {
  background-color: #fff;
  padding: 8px 16px;
}
</style>
