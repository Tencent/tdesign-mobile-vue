<template>
  <t-cell title="选择日期(时分)" :note="value || '时 分'" @click="visible = true" />
  <t-popup v-model="visible" placement="bottom">
    <t-date-time-picker
      v-model="value"
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
