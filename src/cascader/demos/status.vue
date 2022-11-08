<template>
  <t-input :value="address" label="地址" placeholder="选择地址" readonly @click="show = true" />
  <t-popup v-model="show" placement="bottom">
    <t-cascader v-model="address" :options="provinces" @change="onChange" @cancel="show = false" />
  </t-popup>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
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

const show = ref(false);
const address = ref('');

const onChange = (value: string, options: TdCascaderItems) => {
  address.value = value;
  show.value = false;
};
</script>
