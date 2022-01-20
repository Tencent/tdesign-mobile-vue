<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DateTimePicker 时间选择器</h1>
    <p class="summary">用于选择一个时间点或者一个时间段</p>
    <tdesign-demo-block title="01 类型" summary="基础时间选择器">
      <t-input :value="text.ymd" label="选择日期(年月日)" placeholder="年月日" @click="show.ymd = true" />
      <t-popup v-model="show.ymd" position="bottom">
        <t-date-time-picker
          v-model="text.ymd"
          title="选择日期"
          :showWeek="true"
          @change="onChange"
          @columnChange="onColumnChange"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const show = reactive({
      ymd: true,
    });
    const text = reactive({
      ymd: '2022-01-09',
    });

    const onChange = (e: any) => {
      console.log('date-time-picker:change', e);
    };

    const onColumnChange = (e: any) => {
      console.log('date-time-picker:columnChange', e);
    };

    const onCancel = () => {
      console.log('date-time-picker:cancel');
      Object.keys(show).forEach((item) => (show[item] = false));
    };

    const onConfirm = (e: any) => {
      console.log('date-time-picker:confirm', JSON.stringify(text.ymd));
      show.ymd = false;
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
<style lang="less" scoped>
.tdesign-mobile-demo-block {
  .t-input + .t-input {
    margin-top: 16px;
  }
}
</style>

