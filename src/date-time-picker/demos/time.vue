<template>
  <t-cell title="选择日期(时分)" :note="pickerValue || '时 分'" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      default-value="2022-10-10 10:10"
      :mode="[null, 'minute']"
      title="选择日期"
      format="HH:mm"
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
