<template>
  <t-cell :bordered="false" :note="pickerValue || '时 分'" title="选择日期(间隔)" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      :mode="[null, 'minute']"
      :steps="{ minute: 30 }"
      default-value="10:10"
      format="HH:mm"
      title="选择日期"
      @cancel="onCancel"
      @change="onChange"
      @confirm="onConfirm"
      @pick="onPick"
    />
  </t-popup>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { DateValue } from 'tdesign-mobile-vue';

const visible = ref(false);
const pickerValue = ref('');

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
  pickerValue.value = String(value);
  visible.value = false;
};
</script>
