<script setup lang="ts">
import { reactive } from 'vue';
import { PickerValue } from 'tdesign-mobile-vue';

const cityOptions = () => {
  return [
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
  ];
};

const cityState = reactive({
  show: false,
  city: [],
});

const onConfirm = (val: string[], context: number[]) => {
  console.log(val);
  console.log('context', context);
  cityState.show = false;
};

const onPick = (value: PickerValue[], context: any) => {
  console.log('value', value);
  console.log('context', context);
};
</script>

<template>
  <t-cell arrow title="自定义高度选择器" :note="cityState.city.join(' ')" @click="cityState.show = true" />
  <t-popup v-if="cityState.show" v-model="cityState.show" class="picker-custom-height-demo" placement="bottom">
    <t-picker
      v-model="cityState.city"
      :columns="cityOptions"
      @confirm="onConfirm"
      @cancel="cityState.show = false"
      @pick="onPick"
    />
  </t-popup>
</template>

<style lang="less">
.picker-custom-height-demo {
  --td-picker-item-height: 80px;
  --td-picker-group-height: 400px;
}
</style>
