<template>
  <!-- 联动选择 -->
  <t-cell-group>
    <t-cell arrow title="英雄" :note="state.hero.join(',') || '选择英雄'" @click="state.show = true" />
  </t-cell-group>

  <t-popup v-model="state.show" placement="bottom">
    <t-picker v-model="state.hero" title="王者荣耀" @change="onConfirm" @cancel="onCancel" @pick="onRoleChange">
      <t-picker-item :options="state.roleOptions" />
      <t-picker-item :options="state.heroOptions" />
    </t-picker>
  </t-popup>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import ToastPlugin from '@/toast';
import { PickerValue } from '../type';

const roles = [
  {
    label: '战士',
    value: '战士',
  },
  {
    label: '法师',
    value: '法师',
  },
  {
    label: '射手',
    value: '射手',
  },
  {
    label: '刺客',
    value: '刺客',
  },
  {
    label: '坦克',
    value: '坦克',
  },
  {
    label: '辅助',
    value: '辅助',
  },
];
const curRoleIndex = ref(0);
const heroes = [
  [
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
  [
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
  [
    {
      label: '百里守约',
      value: '百里守约',
    },
    {
      label: '成吉思汗',
      value: '成吉思汗',
    },
    {
      label: '狄仁杰',
      value: '狄仁杰',
    },
    {
      label: '伽罗',
      value: '伽罗',
    },
  ],
  [
    {
      label: '马超',
      value: '马超',
    },
    {
      label: '上官婉儿',
      value: '上官婉儿',
    },
    {
      label: '云中君',
      value: '云中君',
    },
    {
      label: '司马懿',
      value: '司马懿',
    },
  ],
  [
    {
      label: '刘邦',
      value: '刘邦',
    },
    {
      label: '项羽',
      value: '项羽',
    },
    {
      label: '庄周',
      value: '庄周',
    },
    {
      label: '白起',
      value: '白起',
    },
  ],
  [
    {
      label: '蔡文姬',
      value: '蔡文姬',
    },
    {
      label: '瑶',
      value: '瑶',
    },
    {
      label: '杨玉环',
      value: '杨玉环',
    },
    {
      label: '盾山',
      value: '盾山',
    },
  ],
];

const state = reactive({
  show: false,
  roleOptions: roles,
  heroOptions: computed(() => heroes[curRoleIndex.value]),
  hero: [],
});
const onRoleChange = (value: PickerValue[], context: any) => {
  curRoleIndex.value = context.index;
};

const onConfirm = (e: CustomEvent) => {
  ToastPlugin({ message: JSON.stringify(e) });
  state.show = false;
};

const onCancel = () => {
  ToastPlugin({ message: '已取消' });
  state.show = false;
};
</script>
