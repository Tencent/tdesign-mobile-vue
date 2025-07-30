<template>
  <t-cell title="选择时间" arrow hover :note="pickerValueText || ''" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      :value="pickerValue"
      :mode="['date']"
      title="选择时间"
      start="2015-5-5"
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
import { DateValue } from 'tdesign-mobile-vue';

const visible = ref(false);
const pickerValue = ref<DateValue>('2021-12-23');
const pickerValueText = ref('');
const onChange = (value: DateValue) => {
  console.log('change: ', value);
};

const onPick = (value: DateValue) => {
  console.log('pick: ', value);
};

const onCancel = () => {
  console.log('cancel');
  visible.value = false;
};

const onConfirm = (value: DateValue) => {
  console.log('confirm: ', value);
  pickerValue.value = value;
  pickerValueText.value = String(value);
  visible.value = false;
};
</script>
