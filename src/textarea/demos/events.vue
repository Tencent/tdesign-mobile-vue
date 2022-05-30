<template>
  <div class="tdesign-mobile-demo">
    <t-textarea
      v-model="value"
      name="标签文字"
      label="标签文字"
      placeholder="请输入文字"
      @focus="onFocus"
      @blur="onBlur"
      @change="onChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const value = ref('');
const onFocus = (value, e) => {
  console.log('onFocus: ', value, e);
};
const onBlur = (value, e) => {
  console.log('onBlur: ', value, e);
};
const onChange = (val: string) => {
  console.log('change: ', val);
};
</script>
