<template>
  <div class="action-sheet-demo">
    <t-button block variant="outline" theme="primary" @click="visible = true">常规列表型</t-button>
    <t-button block variant="outline" theme="primary" @click="showOverlayCallAPI">函数调用</t-button>
    <t-button block variant="outline" theme="primary" @click="descVisible = true">带描述列表型</t-button>
    <t-button block variant="outline" theme="primary" @click="iconVisible = true">带图标列表型</t-button>
    <t-button block variant="outline" theme="primary" @click="badgeVisible = true">带徽标列表型</t-button>
  </div>
  <t-action-sheet v-model="visible" :items="baseData.items" @selected="handleSelected" @cancel="handleCancel" />
  <t-action-sheet
    v-model="descVisible"
    :description="descData.description"
    :items="descData.items"
    @selected="handleSelected"
    @cancel="handleCancel"
  />
  <t-action-sheet v-model="iconVisible" :items="iconData.items" @selected="handleSelected" @cancel="handleCancel" />
  <t-action-sheet
    v-model="badgeVisible"
    :description="badgeData.description"
    :items="badgeData.items"
    @selected="handleSelected"
    @cancel="handleCancel"
  />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { AppIcon } from 'tdesign-icons-vue-next';
import { ActionSheet, ActionSheetItem } from 'tdesign-mobile-vue';

const apIcon = () => h(AppIcon, { size: '24px' });
const visible = ref(false);
const descVisible = ref(false);
const iconVisible = ref(false);
const badgeVisible = ref(false);
const baseData = {
  items: ['选项一', '选项二', '选项三', '选项四'],
};
const descData = {
  description: '动作面板描述文字',
  items: ['选项一', '选项二', '选项三', '选项四'],
};
const iconData = {
  description: '动作面板描述文字',
  items: [
    {
      label: '选项一',
      icon: () => h(AppIcon, { size: '24px' }),
    },
    {
      label: '选项二',
      icon: () => h(AppIcon, { size: '24px' }),
    },
    {
      label: '选项三',
      icon: apIcon,
    },
    {
      label: '选项四',
      icon: apIcon,
    },
  ],
};
const badgeData = {
  description: '动作面板描述文字',
  items: [
    {
      label: '选项一',
      badge: { count: 1 },
    },
    {
      label: '选项二',
      badge: { dot: true },
    },
    {
      label: '选项三',
      badge: { dot: true },
    },
    {
      label: '选项四',
      badge: { dot: true },
    },
  ],
};
const handleSelected = (selected: ActionSheetItem | string, selectedIndex: number) => {
  console.log(selected, selectedIndex);
  ActionSheet.close();
};
const handleCancel = (e: any): void => {
  ActionSheet.close();
};
const showOverlayCallAPI = () => {
  ActionSheet.show({
    items: baseData.items,
    onSelected: handleSelected,
    onCancel: handleCancel,
    onClose: handleCancel,
  });
};
</script>
<style lang="less" scoped>
.action-sheet-demo {
  margin-bottom: 16px;
}
</style>
