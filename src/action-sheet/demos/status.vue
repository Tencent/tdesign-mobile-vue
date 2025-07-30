<template>
  <div class="action-sheet-demo">
    <t-button block variant="outline" theme="primary" @click="visible = true">列表型选项状态</t-button>
  </div>
  <t-action-sheet v-model="visible" :items="iconData.items" @selected="handleSelected" @cancel="handleCancel" />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { ActionSheetItem } from 'tdesign-mobile-vue';

const apIcon = () => h(AppIcon, { size: '24px' });
const visible = ref(false);
const iconData = {
  description: '列表型选项状态',
  items: [
    {
      label: '选项一',
      icon: () => h(AppIcon, { size: '24px' }),
    },
    {
      label: '选项二',
      icon: () => h(AppIcon, { size: '24px' }),
      color: '#0052D9',
    },
    {
      label: '选项三',
      icon: apIcon,
      disabled: true,
    },
    {
      label: '选项四',
      icon: apIcon,
      color: '#E34D59',
    },
  ],
};

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
