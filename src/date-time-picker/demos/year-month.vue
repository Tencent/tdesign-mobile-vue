<template>
  <t-cell title="选择时间" arrow hover :note="valueText || ''" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      v-model="value"
      mode="month"
      title="选择时间"
      format="YYYY-MM"
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
const value = ref<DateValue>('2021-09');
const valueText = ref('');
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
  valueText.value = String(value);
  visible.value = false;
};
</script>
