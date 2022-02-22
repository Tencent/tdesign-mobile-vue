<template>
  <tdesign-demo-block>
    <t-input :value="text.ymd2" label="选择日期" placeholder="日期" @click="show.ymd2 = true" />
    <t-popup v-model="show.ymd2" position="bottom">
      <t-date-time-picker
        v-model="text.ymd2"
        :mode="['year', 'month', 'date']"
        title="选择日期"
        :disable-date="{
          before: '2019-05-15',
          after: '2022-08-20',
        }"
        @change="onChange"
        @column-change="onColumnChange"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </t-popup>
  </tdesign-demo-block>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { DateValue } from '../type';

export default defineComponent({
  setup() {
    const show = reactive({
      ymd2: false,
    });
    const text = reactive({
      ymd2: '2020-08-10',
    });

    const onChange = (value: DateValue) => {
      console.log('date-time-picker:change', value);
    };

    const onColumnChange = ({ value, index }: { value: DateValue, index: number}) => {
      console.log('date-time-picker:columnChange', value, index);
    };

    const onCancel = () => {
      console.log('date-time-picker:cancel');
      Object.keys(show).forEach((item) => (show[item] = false));
    };

    const onConfirm = ({ value }: { value: DateValue }) => {
      console.log('date-time-picker:confirm', JSON.stringify(value));
      Object.keys(show).forEach((item) => (show[item] = false));
    };

    return {
      onChange,
      onColumnChange,
      onCancel,
      onConfirm,
      show,
      text,
    };
  },
});
</script>
