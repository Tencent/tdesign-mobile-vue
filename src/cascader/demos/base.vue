<template>
  <div>
    <t-input :value="address" label="地址" placeholder="选择地址" @click="show = true" />
    <t-popup v-model="show" placement="bottom">
      <t-cascader
        v-model="address"
        title="选择地址"
        :options="options"
        @change="onChange"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </t-popup>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TdCascaderItems } from '../type';

const address = ref('');
const show = ref(false);
const onChange = (value: TdCascaderItems) => {
  console.log(value);
};

const onConfirm = () => {
  console.log('confirm');
};

const options: TdCascaderItems = [
  {
    label: '上海市',
    value: '上海市',
    children: [
      {
        label: '普陀区',
        value: '普陀区',
      },
      {
        label: '长宁区',
        value: '长宁区',
      },
    ],
  },
  {
    label: '北京市',
    value: '北京市',
    children: [
      {
        label: '朝阳区',
        value: '朝阳区',
      },
      {
        label: '丰台区',
        value: '丰台区',
      },
    ],
  },
];
</script>
