<template>
  <t-cell title="选择日期" :note="pickerValueText || '年 月 日'" @click="visible = true" />
  <t-date-time-picker
    :value="pickerValue"
    :mode="['date']"
    title="选择日期"
    start="2020-6-30"
    end="2025-6-30"
    format="YYYY-MM-DD"
    :steps="steps"
    :use-popup="true"
    :visible="visible"
    :filter="filter"
    auto-close
    @change="onChange"
    @pick="onPick"
    @confirm="onConfirm"
    @cancel="onCancel"
    @close="onclose"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const pickerValue = ref('2021-12-23');
const pickerValueText = ref('');
const steps = ref({
  date: 3,
});
const onChange = (value: string) => {
  console.log('change: ', value);
};

const onPick = (value: string) => {
  console.log('pick: ', value);
};

const onCancel = () => {
  console.log('cancel');
};

const onConfirm = (value: string) => {
  console.log('confirm: ', value);
  pickerValue.value = value;
  pickerValueText.value = value;
};

const onclose = (triggerSource: string) => {
  console.log('close: ', triggerSource);
  visible.value = false;
};

const filter = (type: string, arr: string[]) => {
  if (type === 'date') {
    return arr.slice(1);
  }
  return arr;
};
</script>
