<template>
  <tdesign-demo-block>
    <t-input :value="text.ymdhms" label="选择日期时间" placeholder="日期时间" @click="show.ymdhms = true" />
    <t-popup v-model="show.ymdhms" position="bottom">
      <t-date-time-picker
        v-model="text.ymdhms"
        :mode="['year', 'month', 'date', 'hour', 'minute', 'second']"
        title="选择日期时间"
        :show-week="true"
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
      ymdhms: false,
    });
    const text = reactive({
      ymdhms: '',
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
