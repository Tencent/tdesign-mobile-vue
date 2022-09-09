<template>
  <tdesign-demo-block>
    <t-input :value="text.hm" label="选择时分" placeholder="时分" @click="show.hm = true" />
    <t-popup v-model="show.hm" placement="bottom">
      <t-date-time-picker
        v-model="text.hm"
        :mode="[null, 'minute']"
        title="选择时分"
        @change="onChange"
        @pick="onPick"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </t-popup>
  </tdesign-demo-block>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import dayjs from 'dayjs';
import { DateValue } from '../type';

export default defineComponent({
  setup() {
    const show = reactive({
      hm: false,
    });
    const text = reactive({
      hm: '2020-08-10 12:01',
    });

    const showHm = computed(() => {
      return dayjs(text.hm).format('HH:mm');
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
      showHm,
    };
  },
});
</script>
