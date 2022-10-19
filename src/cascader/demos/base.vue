<template>
  <t-input :value="address" readonly label="地址" placeholder="选择地址" @click="show = true" />
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TdCascaderItems } from '../type';

const address = ref('');
const show = ref(false);
const onChange = (value: string, options: TdCascaderItems) => {
  address.value = options.map((item) => item.label).join('/');
  show.value = false;
};

const onConfirm = () => {
  console.log('confirm');
};

const options: TdCascaderItems = [
  {
    label: '广东省',
    value: 'gd',
    children: [
      {
        label: '深圳市',
        value: 'sz',
        children: [
          {
            label: '南山区',
            value: 'ns',
          },
          {
            label: '福田区',
            value: 'ft',
          },
        ],
      },
      {
        label: '广州市',
        value: 'gz',
        children: [
          {
            label: '白云区',
            value: 'by',
          },
          {
            label: '海珠区',
            value: 'hz',
          },
        ],
      },
    ],
  },
  {
    label: '福建省',
    value: 'fj',
    children: [
      {
        label: '厦门市',
        value: 'xm',
      },
      {
        label: '泉州市',
        value: 'qz',
      },
    ],
  },
];
</script>
