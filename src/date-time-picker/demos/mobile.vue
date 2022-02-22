<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DateTimePicker 时间选择器</h1>
    <p class="summary">用于选择一个时间点或者一个时间段</p>
    <tdesign-demo-block title="01 类型" summary="时间选择器">
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

    <tdesign-demo-block title="02 功能" summary="日期时间禁用">
      <t-input :value="text.ymd2" label="选择日期" placeholder="日期" @click="show.ymd2 = true" />
      <t-popup v-model="show.ymd2" position="bottom">
        <t-date-time-picker
          v-model="text.ymd2"
          :mode="['year', 'month', 'date']"
          title="选择日期"
          :disable-date="{
            before: '2019-05-15',
            after: '2022-08-20',
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
import { DateValue } from '../type';

export default defineComponent({
  setup() {
    const show = reactive({
      ymdhms: false,
      ymd: false,
      ym: false,
      hm: false,

      ymd2: false,
    });
    const text = reactive({
      ymdhms: '2020-08-10 12:50:00',
      ymd: '2020-08-10',
      ym: '2020-08',
      hm: '12:01',

      ymd2: '2020-08-10',
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
