<template>
  <tdesign-demo-block>
    <t-input :value="text.hm" label="选择时分" placeholder="时分" @click="show.hm = true" />
    <t-popup v-model="show.hm" position="bottom">
      <t-date-time-picker
        v-model="text.hm"
        :mode="['hour', 'minute']"
        title="选择时分"
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
      hm: false,
    });
    const text = reactive({
      hm: '13:20',
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
