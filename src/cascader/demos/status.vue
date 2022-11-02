<template>
  <t-input :value="address.address4" label="地址" placeholder="选择地址" readonly @click="show.show4 = true" />
  <t-popup v-model="show.show4" placement="bottom">
    <t-cascader
      v-model="address.address4"
      :options="provinces"
      @change="onChange"
      @cancel="show.show4 = false"
      @confirm="onConfirm"
    >
    </t-cascader>
  </t-popup>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { TdCascaderItems } from '../type';

const provinces: TdCascaderItems = [
  {
    label: '浙江省',
    value: '浙江省',
    disabled: true,
  },
  {
    label: '江苏省',
    value: '江苏省',
  },
];

const show = reactive({
  show1: false,
  show2: false,
  show3: false,
  show4: false,
});

const address = reactive({
  address1: '',
  address2: '',
  address3: '',
  address4: '',
  address5: '',
});

const onChange = (value: TdCascaderItems, options: any) => {
  show.show1 = false;
  show.show2 = false;
  show.show3 = false;
  show.show4 = false;
};

const onConfirm = () => {
  console.log('confirm');
};
</script>
