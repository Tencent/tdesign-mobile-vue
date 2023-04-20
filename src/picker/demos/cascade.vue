<template>
  <!-- 联动选择 -->
  <t-cell-group>
    <t-cell arrow title="英雄" :note="data.join(',') || '选择英雄'" @click="state.show = true" />
  </t-cell-group>

  <t-popup v-model="state.show" placement="bottom">
    <t-cascade
      :value="data"
      title="王者荣耀"
      :columns="roles"
      @change="onChange"
      @confirm="onConfirm"
      @cancel="onCancel"
      @pick="onRoleChange"
    />
  </t-popup>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import { ToastPlugin } from 'tdesign-mobile-vue';
import { PickerValue } from '../type';

const roles = [
  {
    label: '战士',
    value: '战士',
    children: [
      {
        label: '夏侯惇',
        value: '夏侯惇',
      },
      {
        label: '吕布',
        value: '吕布',
      },
      {
        label: '铠',
        value: '铠',
      },
      {
        label: '狂铁',
        value: '狂铁',
      },
    ],
  },
  {
    label: '法师',
    value: '法师',
    children: [
      {
        label: '安琪拉',
        value: '安琪拉',
      },
      {
        label: '扁鹊',
        value: '扁鹊',
      },
      {
        label: '不知火舞',
        value: '不知火舞',
      },
      {
        label: '嫦娥',
        value: '嫦娥',
      },
    ],
  },
];

const state = reactive({
  show: false,
});

const data: any = ref(['战士', '狂铁']);
const onChange = (value: PickerValue[], context: any) => {
  data.value = value;
};
const onRoleChange = (value: PickerValue[], context: any) => {
  console.log('pick执行一次');
  console.log('value', value);
  console.log('context', context);
  // curRoleIndex.value = context.index;
};
const onConfirm = (value: PickerValue[], context: any) => {
  console.log('value', value);
  console.log('context', context);
  ToastPlugin({ message: JSON.stringify(value) });
  state.show = false;
};

const onCancel = () => {
  ToastPlugin({ message: '已取消' });
  state.show = false;
};
</script>
