<template>
  <t-config-provider :global-config="globalConfig">
    <div class="rate-demo-cell rate-demo-cell--space">
      <div class="rate-demo-cell__label">Rating</div>
      <t-rate v-model="rateValue" show-text />
    </div>

    <t-calendar
      v-model:visible="visibleCalendar"
      @close="onCalendarClose"
      @confirm="handleCalendarConfirm"
      @select="handleCalendarSelect"
    />
    <t-cell title="Single select date" arrow :note="calendarDateNote" @click="visibleCalendar = true" />

    <t-cell title="Select time" :note="pickerValueText || 'YY-MM-DD'" @click="visible = true" />
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
import enConfig from 'tdesign-mobile-vue/es/locale/en_US';

// 全局特性配置，可以引入英文默认配置 enConfig，还可以在默认配置的基础上进行自定义配置
const globalConfig = merge(enConfig, {
  dateTimePicker: {
    title: 'title test',
  },
});

const visible = ref(false);
const pickerValue = ref('2021-12-23');
const pickerValueText = ref('');

const rateValue = ref(0);

const visibleCalendar = ref(false);
const calendarDateNote = ref('');

const format = (val: Date) => {
  const date = new Date(val);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const handleCalendarConfirm = (val: Date) => {
  console.log(val);
  calendarDateNote.value = format(val);
};
const handleCalendarSelect = (val: Date) => {
  console.log(val);
};
const onCalendarClose = (trigger: string) => {
  console.log('closed by', trigger);
};

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

<style lang="less" scoped>
.rate-demo-cell {
  background-color: var(--bg-color-demo, #fff);
  padding: 12px 16px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__label {
    font-size: 16px;
    margin-right: 16px;
    min-width: 80px;
    color: var(--td-text-color-primary, rgba(0, 0, 0, 0.9));
  }

  &--space {
    margin-bottom: 16px;
  }
}
</style>
