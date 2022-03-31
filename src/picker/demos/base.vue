<template>
  <!-- demos -->
  <t-cell-group>
    <t-cell arrow title="城市" :note="cityState.city.join(',') || '选择城市'" @click="cityState.show = true" />
  </t-cell-group>

  <t-cell-group>
    <t-cell
      arrow
      title="年份和季节"
      :note="seasonState.season.join(',') || '选择城年份和季节'"
      @click="seasonState.show = true"
    />
  </t-cell-group>

  <t-cell-group>
    <t-cell arrow title="日期" :note="dateState.date.join(',') || '选择日期'" @click="dateState.show = true" />
    <span style="color: #888; padding: 5px 10px; font-size: 12px">仅做展示，年月日关联关系由自己实现</span>
  </t-cell-group>

  <!-- pickers -->
  <t-popup v-model="cityState.show" placement="bottom">
    <t-picker v-model="cityState.city" @confirm="onCityConfirm" @cancel="cityState.show = false">
      <t-picker-item :options="cityOptions" />
    </t-picker>
  </t-popup>

  <t-popup v-model="seasonState.show" placement="bottom">
    <t-picker v-model="seasonState.season" @confirm="onYearAndSeasonConfirm" @cancel="onCancel">
      <t-picker-item :options="yearOptions" :formatter="(val: number) => `${val}年`" />
      <t-picker-item :options="seasonOptions" />
    </t-picker>
  </t-popup>

  <t-popup v-model="dateState.show" placement="bottom">
    <t-picker v-model="dateState.date" @confirm="onDateConfirm" @cancel="onCancel">
      <t-picker-item :options="yearOptions" :formatter="(val: number) => `${val}年`" />
      <t-picker-item :options="monthOptions" :formatter="(val: number) => `${val}月`" />
      <t-picker-item :options="dayOptions" :formatter="(val: number) => `${val}日`" />
    </t-picker>
  </t-popup>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import ToastPlugin from '@/toast';
import { PickerItemOptionObject } from '../type';

const cityOptions = ['北京', '上海', '广州', '深圳', '杭州', '成都', '长沙'];
const currentYear = Number(new Date().getFullYear());
const yearOptions = Array.from(new Array(10), (_, index) => currentYear - index);
const seasonOptions = ['春', '夏', '秋', '冬'];
const monthOptions = Array.from(new Array(12), (_, index) => index + 1);
const dayOptions = Array.from(new Array(31), (_, index) => index + 1);

const cityState = reactive({
  show: false,
  city: ['深圳'],
});

const seasonState = reactive({
  show: false,
  season: [],
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
  ToastPlugin({ message: JSON.stringify(val) });
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
</script>
