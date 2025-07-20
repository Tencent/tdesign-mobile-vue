<template>
  <t-cell title="带标题时间选择器" arrow hover :note="pickerValueText || ''" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      :value="pickerValue"
      :mode="date"
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
import { ref, watch } from 'vue';

const visible = ref(false);
const pickerValue = ref('2021-12-23');
const pickerValueText = ref('');
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
  pickerValueText.value = value;
  visible.value = false;
};
</script>
