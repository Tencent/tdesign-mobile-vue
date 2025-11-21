<template>
  <div>
    <t-config-provider :global-config="globalConfig">
      <t-calendar
        v-model:visible="visible"
        :min-date="minDate"
        :max-date="maxDate"
        :value="defaultDate"
        @close="onClose"
        @confirm="handleConfirm"
        @select="handleSelect"
      />
      <t-cell title="国际化" arrow :note="dateNote" @click="visible = true" />
    </t-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import enConfig from 'tdesign-mobile-vue/es/locale/en_US';
import type { CalendarValue } from 'tdesign-mobile-vue';

const globalConfig = enConfig;

const visible = ref(false);
const dateNote = ref('');
const minDate = new Date(2022, 1, 1);
const maxDate = new Date(2022, 2, 20);

const format = (val: Date) => {
  const date = new Date(val);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const defaultDate = new Date(2022, 1, 18);
dateNote.value = format(defaultDate);

const handleConfirm = (val: CalendarValue) => {
  console.log(val);
  dateNote.value = format(val as Date);
};
const handleSelect = (val: Date) => {
  console.log(val);
};
const onClose = (trigger: string) => {
  console.log('closed by', trigger);
};
</script>
