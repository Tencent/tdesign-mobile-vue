<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Cascader 级联选择器</h1>
    <p class="summary">用于多层级数据选择，主要为树形结构，可展示更多的数据</p>
    <tdesign-demo-block title="01 基础" summary="基本用法">
      <base-vue />
    </tdesign-demo-block>
    <tdesign-demo-block title="02 状态" summary="禁用可选项">
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
    </tdesign-demo-block>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { TdCascaderItems } from '../type';

import baseVue from './base.vue';

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

const onChange = (value: TdCascaderItems, options) => {
  console.log(options);
  show.show1 = false;
  show.show2 = false;
  show.show3 = false;
  show.show4 = false;
};

const onConfirm = () => {
  console.log('confirm');
};
</script>
