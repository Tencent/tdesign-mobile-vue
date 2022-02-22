<template>
  <tdesign-demo-block>
    <t-input :value="text.ymd" label="选择年月日" placeholder="年月日" @click="show.ymd = true" />
    <t-popup v-model="show.ymd" position="bottom">
      <t-date-time-picker
        v-model="text.ymd"
        :mode="['year', 'month', 'date']"
        title="选择年月日"
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

export default defineComponent({
  setup() {
    const show = reactive({
      ymd: false,
    });
    const text = reactive({
      ymd: '2022-01-09',
    });

    const onChange = (value) => {
      console.log('date-time-picker:change', value);
    };

    const onColumnChange = ({ value, index }) => {
      console.log('date-time-picker:columnChange', value, index);
    };

    const onCancel = () => {
      console.log('date-time-picker:cancel');
      Object.keys(show).forEach((item) => (show[item] = false));
    };

    const onConfirm = ({ value }) => {
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
