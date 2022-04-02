<template>
  <t-cell-group>
    <t-cell arrow title="角色" :note="roleState.current?.label || '选择角色'" @click="roleState.show = true" />
  </t-cell-group>

  <t-popup v-model="roleState.show" placement="bottom">
    <t-picker v-model="roleState.role" title="请选择你的角色" @confirm="onRoleConfirm" @cancel="onCancel">
      <t-picker-item :options="rolesObjOptions" />
    </t-picker>
  </t-popup>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import ToastPlugin from '@/toast';
import { PickerItemOptionObject } from '../type';

const rolesObjOptions = [
  { label: '战士', value: 'warrior' },
  { label: '法师', value: 'mage' },
  { label: '射手', value: 'shooter' },
  { label: '刺客', value: 'ssassin' },
  { label: '坦克', value: 'tank' },
  { label: '辅助', value: 'auxiliary' },
];

const roleState = reactive({
  show: false,
  role: [],
  current: {} as PickerItemOptionObject | undefined,
});

const onCancel = () => {
  ToastPlugin({ message: '已取消' });
  roleState.show = false;
};

const onRoleConfirm = (val: string[]) => {
  const currentRole = rolesObjOptions.find((item: PickerItemOptionObject) => item.value === val[0]);
  roleState.current = currentRole;

  ToastPlugin({
    message: `[${currentRole?.label}(${currentRole?.value})]`,
  });

  roleState.show = false;
};
</script>
