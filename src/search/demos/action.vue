<template>
  <div class="example-search">
    <t-search
      :value="searchValue"
      placeholder="搜索预设文案"
      center
      action="取消"
      @action-click="onActionClick"
      @blur="onBlur"
      @change="onChange"
      @clear="onClear"
      @focus="onFocus"
      @search="onSearch"
      @submit="onSubmit"
    ></t-search>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const searchValue = ref('');

const onChange = (value: string, context: { e?: InputEvent | MouseEvent }) => {
  console.log('change: ', value, context);
  searchValue.value = value;
};

const onBlur = (context: { value: string; e: FocusEvent }) => {
  console.log('blur: ', context);
};

const onClear = (context: { e: MouseEvent }) => {
  console.log('clear: ', context);
};
const onFocus = (context: { value: string; e: FocusEvent }) => {
  console.log('focus: ', context);
};

const onActionClick = (context: { e: MouseEvent }) => {
  console.log('action: ', context);
};

const onSearch = (context?: {
  value: string;
  trigger: 'submit' | 'option-click' | 'clear';
  e?: InputEvent | MouseEvent;
}) => {
  console.log('search: ', context);
};

const onSubmit = (context: { value: string; e: KeyboardEvent }) => {
  console.log('submit: ', context);
};
</script>
<style lang="less">
.example-search {
  background-color: var(--bg-color-demo, #fff);
  padding: 8px 16px;
}
</style>
