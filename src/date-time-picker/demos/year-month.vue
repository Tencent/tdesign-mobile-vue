<template>
  <tdesign-demo-block>
    <t-input :value="text.ym" label="选择年月" placeholder="年月" @click="show.ym = true" />
    <t-popup v-model="show.ym" position="bottom">
      <t-date-time-picker
        v-model="text.ym"
        :mode="['year', 'month']"
        title="选择年月"
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
import { DateValue } from 'tdesign-mobile-vue';

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

    const onColumnChange = ({ value, index }: { value: DateValue; index: number }) => {
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
