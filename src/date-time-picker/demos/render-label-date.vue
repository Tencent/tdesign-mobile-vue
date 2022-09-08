<template>
  <tdesign-demo-block>
    <t-input :value="text.ym" label="选择年月" placeholder="年月" @click="show.ym = true" />
    <t-popup v-model="show.ym" placement="bottom">
      <t-date-time-picker
        v-model="text.ym"
        :mode="mode"
        title="选择日期时间"
        :render-label="renderLabel"
        @change="onChange"
        @pick="onPick"
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
      ym: false,
    });
    const text = reactive({
      ym: '2020-08',
    });

    const onChange = (value: DateValue) => {
      console.log('date-time-picker:change', value);
    };

    const onPick = (value: DateValue) => {
      console.log('date-time-picker:pick', value);
    };

    const onCancel = () => {
      console.log('date-time-picker:cancel');
      Object.keys(show).forEach((item) => (show[item] = false));
    };

    const onConfirm = (value: DateValue) => {
      console.log('date-time-picker:confirm', value);
      Object.keys(show).forEach((item) => (show[item] = false));
    };

    const renderLabel = (type: string, value: number) => {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    };

    return {
      onChange,
      onPick,
      onCancel,
      onConfirm,
      show,
      text,
    };
  },
});
</script>
