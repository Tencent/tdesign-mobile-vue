<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DateTimePicker 时间选择器</h1>
    <p class="summary">用于选择一个时间点或者一个时间段</p>
    <tdesign-demo-block title="01 类型" summary="基础时间选择器">
      <t-input :value="text.ymd" label="选择日期(年月日)" placeholder="年月日" @click="show.ymd = true" />
      <t-popup v-model="show.ymd" position="bottom">
        <t-date-time-picker
          v-model="text.ymd"
          :mode="['year', 'month', 'date']"
          title="选择日期"
          @change="onChange"
          @column-change="onColumnChange"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input :value="text.hm" label="选择时间(时分)" placeholder="时分" @click="show.hm = true" />
      <t-popup v-model="show.hm" position="bottom">
        <t-date-time-picker
          v-model="text.hm"
          :mode="['hour', 'minute']"
          title="选择时间"
          @change="onChange"
          @column-change="onColumnChange"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input
        :value="text.ymdhms"
        label="选择日期时间(年月日时分秒)"
        placeholder="年月日时分秒"
        @click="show.ymdhms = true"
      />
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

    <tdesign-demo-block title="02 功能" summary="日期时间禁用">
      <t-input :value="text.ymd2" label="选择日期(年月日)" placeholder="年月日" @click="show.ymd2 = true" />
      <t-popup v-model="show.ymd2" position="bottom">
        <t-date-time-picker
          v-model="text.ymd2"
          :mode="['year', 'month', 'date']"
          title="选择日期"
          :disable-date="{
            before: '2021-05-15',
            after: '2022-08-20',
          }"
          @change="onChange"
          @column-change="onColumnChange"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input :value="text.hm2" label="选择时间(时分)" placeholder="时分" @click="show.hm2 = true" />
      <t-popup v-model="show.hm2" position="bottom">
        <t-date-time-picker
          v-model="text.hm2"
          :mode="['hour', 'minute']"
          title="选择时间"
          :disable-date="{
            from: '2021-05-15 15:20:20',
            to: '2022-05-15 15:35:31',
          }"
          @change="onChange"
          @column-change="onColumnChange"
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
      ymd: false,
      hm: false,
      ymdhms: false,

      ymd2: false,
      hm2: false,
      ymdhms2: false,
    });
    const text = reactive({
      ymd: '2022-01-09',
      hm: '13:20',
      ymdhms: '',

      ymd2: '2022-01-09',
      hm2: '13:20',
      ymdhms2: '',
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
<style lang="less" scoped>
.tdesign-mobile-demo-block {
  .t-input + .t-input {
    margin-top: 16px;
  }
}
</style>
