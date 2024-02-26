<template>
  <t-config-provider :global-config="globalConfig">
    <t-cell title="select time" :note="pickerValueText || 'YY-MM-DD'" @click="visible = true" />
    <t-popup v-model="visible" placement="bottom">
      <t-date-time-picker
        :value="pickerValue"
        :mode="['date']"
        start="2015-5-5"
        format="YYYY-MM-DD"
        @change="onChange"
        @pick="onPick"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </t-popup>
  </t-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import merge from 'lodash/merge';
import enConfig from '../../locale/en_US';

// 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
const globalConfig = merge(enConfig, {
  dateTimePicker: {
    title: 'title test',
  },
});

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
