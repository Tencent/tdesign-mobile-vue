<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">DateTimePicker 时间选择器</h1>
    <p class="summary">用于选择一个时间点或者一个时间段</p>
    <tdesign-demo-block title="01 基本用法" summary="基本用法">
      <t-input :value="text.ymdhms" label="日期时间" placeholder="日期时间" @click="show.ymdhms = true" />
      <t-popup v-model="show.ymdhms" placement="bottom">
        <t-date-time-picker
          v-model="text.ymdhms"
          :mode="mode"
          title="选择日期时间"
          @change="onChange"
          @pick="onPick"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input :value="text.ymd" label="年月日" placeholder="年月日" @click="show.ymd = true" />
      <t-popup v-model="show.ymd" placement="bottom">
        <t-date-time-picker
          v-model="text.ymd"
          :mode="'date'"
          title="选择年月日"
          format="YYYY-MM-DD"
          @change="onChange"
          @pick="onPick"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input :value="text.ym" label="年月" placeholder="年月" @click="show.ym = true" />
      <t-popup v-model="show.ym" placement="bottom">
        <t-date-time-picker
          v-model="text.ym"
          :mode="'month'"
          title="选择年月"
          format="YYYY-MM"
          @change="onChange"
          @pick="onPick"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
      <t-input :value="showHm" label="时分" placeholder="时分" @click="show.hm = true" />
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
    <tdesign-demo-block title="02 时间范围" summary="设置最大、最小时间">
      <t-input :value="text.ymdhms2" label="日期时间" placeholder="日期时间" @click="show.ymdhms2 = true" />
      <t-popup v-model="show.ymdhms2" placement="bottom">
        <t-date-time-picker
          v-model="text.ymdhms2"
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
    <tdesign-demo-block title="03 自定义label" summary="自定义label">
      <t-input :value="text.ymdhms3" label="日期时间" placeholder="日期时间" @click="show.ymdhms3 = true" />
      <t-popup v-model="show.ymdhms3" placement="bottom">
        <t-date-time-picker
          v-model="text.ymdhms3"
          :mode="mode"
          title="选择日期时间"
          :render-label="renderLabel"
          @change="onChange"
          @pick="onPick"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </t-popup>
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { DateValue } from '../type';

const modeArray = ['date', 'second'];
export default defineComponent({
  setup() {
    const mode = ref(modeArray);
    const show = reactive({
      ymdhms: false,
      ymd: false,
      ym: false,
      hm: false,

      ymdhms2: false,
      ymdhms3: false,
    });
    const text = reactive({
      ymdhms: '2020-08-10 12:50:00',
      ymd: '2020-08-10',
      ym: '2020-08',
      hm: '2020-08-10 12:01',

      ymdhms2: '2020-08-10 12:50:00',
      ymdhms3: '2020-08-10 12:50:00',
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

    const renderLabel = (type: string, value: number) => {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      if (type === 'date') {
        return `${value}日`;
      }
      return value;
    };

    return {
      onChange,
      onPick,
      onCancel,
      onConfirm,
      show,
      text,
      mode,
      renderLabel,
      showHm,
    };
  },
});
</script>
