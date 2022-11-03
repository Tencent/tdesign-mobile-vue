<template>
  <div class="action-sheet-demo">
    <t-button block variant="outline" size="large" @click="visible = true">列表型</t-button>
  </div>
  <t-action-sheet v-model="visible" :items="items" @selected="handleSelected" @cancel="handleCancel" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ActionSheetItem } from '../type';

const visible = ref(false);
const items = [
  '默认按钮',
  { label: '自定义按钮', color: '#0052D9' },
  { label: '失效按钮', disabled: true },
  { label: '告警按钮', color: '#E34D59' },
];
const handleSelected = (selected: ActionSheetItem, selectedIndex: number) => {
  console.log(selected, selectedIndex);
};
const handleCancel = (): void => {
  console.log('cancel');
};
</script>
<style lang="less" scoped>
.action-sheet-demo {
  margin-bottom: 16px;
}
</style>
