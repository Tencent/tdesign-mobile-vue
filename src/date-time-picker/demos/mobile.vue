<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DateTimePicker 时间选择器</h1>
    <p class="summary">用于选择一个时间点或者一个时间段</p>
    <tdesign-demo-block title="01 类型" summary="时间选择器">
      <t-input :value="text.ymdhms" label="日期时间" placeholder="日期时间" @click="show.ymdhms = true" />
      <t-popup v-model="show.ymdhms" placement="bottom">
        <t-date-time-picker
          v-model="text.ymdhms"
          :mode="mode"
          title="选择日期时间"
          :show-week="true"
          @change="onChange"
          @column-change="onColumnChange"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input :value="text.ymd" label="年月日" placeholder="年月日" @click="show.ymd = true" />
      <t-popup v-model="show.ymd" placement="bottom">
        <t-date-time-picker
          v-model="text.ymd"
          :mode="mode.slice(0, 3)"
          title="选择年月日"
          @change="onChange"
          @column-change="onColumnChange"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input :value="text.ym" label="年月" placeholder="年月" @click="show.ym = true" />
      <t-popup v-model="show.ym" placement="bottom">
        <t-date-time-picker
          v-model="text.ym"
          :mode="mode.slice(0, 2)"
          title="选择年月"
          @change="onChange"
          @column-change="onColumnChange"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input :value="text.hm" label="时分" placeholder="时分" @click="show.hm = true" />
      <t-popup v-model="show.hm" placement="bottom">
        <t-date-time-picker
          v-model="text.hm"
          :mode="mode.slice(3, 5)"
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
      <t-popup v-model="show.ymd2" placement="bottom">
        <t-date-time-picker
          v-model="text.ymd2"
          :mode="mode.slice(0, 3)"
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
import { defineComponent, reactive, ref } from 'vue';
import { DateValue, DatePickerColumnChangeContext } from '../type';

const modeArray = ['year', 'month', 'date', 'hour', 'minute', 'second'];
export default defineComponent({
  setup() {
    const mode = ref(modeArray);
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

    const onColumnChange = (data: DatePickerColumnChangeContext) => {
      console.log('date-time-picker:columnChange', data);
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
      mode,
    };
  },
});
</script>
