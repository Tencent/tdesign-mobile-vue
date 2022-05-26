<template>
  <!-- demos -->
  <t-cell-group>
    <t-cell arrow title="城市" :note="cityState.city.join(',') || '选择城市'" @click="cityState.show = true" />
  </t-cell-group>

  <t-cell-group>
    <t-cell
      arrow
      title="年份和季节"
      :note="seasonState.season.join(',') || '选择年份和季节'"
      @click="seasonState.show = true"
    />
  </t-cell-group>

  <t-cell-group>
    <t-cell arrow title="日期" :note="dateState.date.join(',') || '选择日期'" @click="dateState.show = true" />
    <span style="color: #888; padding: 5px 10px; font-size: 12px">仅做展示，年月日关联关系由自己实现</span>
  </t-cell-group>

  <!-- pickers -->
  <t-popup v-model="cityState.show" placement="bottom">
    <t-picker v-model="cityState.city" @change="onCityConfirm" @cancel="cityState.show = false" @pick="onPick">
      <t-picker-item :options="cityOptions" />
    </t-picker>
  </t-popup>

  <t-popup v-model="seasonState.show" placement="bottom">
    <t-picker v-model="seasonState.season" @change="onYearAndSeasonConfirm" @cancel="onCancel" @pick="onPick">
      <t-picker-item :options="yearOptions" :format="(val) => `${val}年`" />
      <t-picker-item :options="seasonOptions" />
    </t-picker>
  </t-popup>

  <t-popup v-model="dateState.show" placement="bottom">
    <t-picker v-model="dateState.date" @change="onDateConfirm" @cancel="onCancel" @pick="onPick">
      <t-picker-item :options="yearOptions" :format="(val) => `${val}年`" />
      <t-picker-item :options="monthOptions" :format="(val) => `${val}月`" />
      <t-picker-item :options="dayOptions" :format="(val) => `${val}日`" />
    </t-picker>
  </t-popup>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import ToastPlugin from '@/toast';
import { PickerValue } from '../type';

const cityOptions = [
  {
    label: '北京',
    value: '北京',
  },
  {
    label: '上海',
    value: '上海',
  },
  {
    label: '广州',
    value: '广州',
  },
  {
    label: '深圳',
    value: '深圳',
  },
  {
    label: '杭州',
    value: '杭州',
  },
  {
    label: '成都',
    value: '成都',
  },
  {
    label: '长沙',
    value: '长沙',
  },
];
const currentYear = Number(new Date().getFullYear());
const yearOptions = Array.from(new Array(10), (_, index) => {
  return {
    label: currentYear - index,
    value: `${currentYear - index}`,
  };
});
const seasonOptions = [
  {
    label: '春',
    value: '春',
  },
  {
    label: '夏',
    value: '夏',
  },
  {
    label: '秋',
    value: '秋',
  },
  {
    label: '冬',
    value: '冬',
  },
];
const monthOptions = Array.from(new Array(12), (_, index) => {
  return {
    label: index + 1,
    value: index + 1,
  };
});
const dayOptions = Array.from(new Array(31), (_, index) => {
  return {
    label: index + 1,
    value: index + 1,
  };
});

const cityState = reactive({
  show: false,
  city: ['深圳'],
});

const seasonState = reactive({
  show: false,
  season: ['2021', '夏'],
});

const dateState = reactive({
  show: false,
  date: [],
});

const onCancel = () => {
  ToastPlugin({ message: '已取消' });
  cityState.show = false;
  seasonState.show = false;
  dateState.show = false;
};

const onCityConfirm = (val: string[]) => {
  console.log(val);
  ToastPlugin({ message: 'JSON.stringify(val)' });
  cityState.show = false;
};

const onYearAndSeasonConfirm = (val: string[]) => {
  ToastPlugin({ message: JSON.stringify(val) });
  seasonState.show = false;
};

const onDateConfirm = (val: string[]) => {
  ToastPlugin({ message: JSON.stringify(val) });
  dateState.show = false;
};

const onPick = (value: PickerValue[], context: any) => {
  console.log('value', value);
  console.log('context', context);
};
</script>
