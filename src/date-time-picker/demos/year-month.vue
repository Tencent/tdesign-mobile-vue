<template>
  <t-cell title="选择日期(年月)" :note="value || '年 月'" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      v-model="value"
      mode="month"
      title="选择日期"
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
import { cell } from 'tdesign-mobile-vue';
import { DateValue } from '../type';

const visible = ref(false);
const value = ref('');

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
  visible.value = false;
};
</script>
