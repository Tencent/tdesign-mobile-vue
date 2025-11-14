<template>
  <t-cell :bordered="false" :note="pickerValueText || ''" arrow hover title="选择时间" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      :mode="['date']"
      :show-week="true"
      :value="pickerValue"
      end="2035-12-31"
      format="YYYY-MM-DD ddd"
      start="1990-1-1"
      title="选择时间"
      @cancel="onCancel"
      @change="onChange"
      @confirm="onConfirm"
      @pick="onPick"
    />
  </t-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { DateValue } from 'tdesign-mobile-vue';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const visible = ref(false);
const pickerValue = ref<DateValue>('2025-07-19');
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
