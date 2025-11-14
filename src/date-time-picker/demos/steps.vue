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
