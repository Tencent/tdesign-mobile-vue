<template>
  <tdesign-demo-block>
    <t-input :value="text.ymd" label="选择年月日" placeholder="年月日" @click="show.ymd = true" />
    <t-popup v-model="show.ymd" position="bottom">
      <t-date-time-picker
        v-model="text.ymd"
        :mode="mode"
        title="选择日期时间"
        start="2020-6-30"
        end="2025-6-30"
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
      ymd: false,
    });
    const text = reactive({
      ymd: '2020-08-10',
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
