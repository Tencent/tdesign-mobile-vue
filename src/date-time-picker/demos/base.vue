<template>
  <tdesign-demo-block>
    <t-input :value="text.ymdhms" label="选择日期时间" placeholder="日期时间" @click="show.ymdhms = true" />
    <t-popup v-model="show.ymdhms" placement="bottom">
      <t-date-time-picker
        v-model="text.ymdhms"
        :mode="['date', 'second']"
        title="选择日期时间"
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
      ymdhms: false,
    });
    const text = reactive({
      ymdhms: '2020-08-10 12:50:00',
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
