<template>
  <t-cell arrow title="选择地区" :note="cityState.city.join(' ')" @click="cityState.show = true" />
  <t-cell arrow title="选择时间" :note="seasonState.season.join(' ')" @click="seasonState.show = true" />

  <t-popup v-model="cityState.show" placement="bottom">
    <t-picker
      v-model="cityState.city"
      :columns="cityOptions"
      @confirm="onConfirm"
      @cancel="cityState.show = false"
      @pick="onPick"
    />
  </t-popup>

  <t-popup v-model="seasonState.show" placement="bottom">
    <t-picker
      v-model="seasonState.season"
      :columns="seasonColumns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @pick="onPick"
    />
  </t-popup>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { PickerValue } from '../type';

const cityOptions = [
  [
    {
      label: '北京市',
      value: '北京市',
    },
    {
      label: '上海市',
      value: '上海市',
    },
    {
      label: '广州市',
      value: '广州市',
    },
    {
      label: '深圳市',
      value: '深圳市',
    },
    {
      label: '杭州市',
      value: '杭州市',
    },
    {
      label: '成都市',
      value: '成都市',
    },
    {
      label: '长沙市',
      value: '长沙市',
    },
  ],
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
const seasonColumns = [yearOptions, seasonOptions];

const cityState = reactive({
  show: false,
  city: [],
});

const seasonState = reactive({
  show: false,
  season: [],
});

const onCancel = () => {
  cityState.show = false;
  seasonState.show = false;
};

const onConfirm = (val: string[], context: number[]) => {
  console.log(val);
  console.log('context', context);
  cityState.show = false;
  seasonState.show = false;
};

const onPick = (value: PickerValue[], context: any) => {
  console.log('value', value);
  console.log('context', context);
};
</script>

<style scoped>
.t-cell {
  margin-bottom: 16px;
}
</style>
