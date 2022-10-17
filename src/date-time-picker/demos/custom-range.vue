<template>
  <t-cell title="选择日期" :note="pickerValue || '年 月 日'" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      :value="pickerValue"
      :mode="['date']"
      title="选择日期"
      start="2020-6-30"
      end="2025-6-30"
      format="YYYY-MM-DD"
      @change="onChange"
      @pick="onPick"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </t-popup>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { cell } from 'tdesign-mobile-vue';

const visible = ref(false);
const pickerValue = ref('');

const onChange = (value: string) => {
  console.log('change: ', value);
};

const onPick = (value: string) => {
  console.log('pick: ', value);
};

const onCancel = () => {
  console.log('cancel');
  visible.value = false;
};

const onConfirm = (value: string) => {
  console.log('confirm: ', value);
  pickerValue.value = value;
  visible.value = false;
};
</script>
