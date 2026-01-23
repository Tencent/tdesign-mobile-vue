<template>
  <div class="action-sheet-demo">
    <t-button block theme="primary" variant="outline" @click="visible = true">常规列表型</t-button>
    <t-button block theme="primary" variant="outline" @click="showOverlayCallAPI">函数调用</t-button>
    <t-button block theme="primary" variant="outline" @click="descVisible = true">带描述列表型</t-button>
    <t-button block theme="primary" variant="outline" @click="iconVisible = true">带图标列表型</t-button>
    <t-button block theme="primary" variant="outline" @click="badgeVisible = true">带徽标列表型</t-button>
  </div>
  <t-action-sheet
    v-model="visible"
    :items="baseData.items"
    cancel-text="cancel"
    @cancel="handleCancel"
    @selected="handleSelected"
  />
  <t-action-sheet
    v-model="descVisible"
    :description="descData.description"
    :items="descData.items"
    cancel-text="cancel"
    @cancel="handleCancel"
    @selected="handleSelected"
  />
  <t-action-sheet
    v-model="iconVisible"
    :items="iconData.items"
    cancel-text="cancel"
    @cancel="handleCancel"
    @selected="handleSelected"
  />
  <t-action-sheet
    v-model="badgeVisible"
    :description="badgeData.description"
    :items="badgeData.items"
    cancel-text="cancel"
    @cancel="handleCancel"
    @selected="handleSelected"
  />
</template>

<script lang="ts" setup>
import { h, ref } from 'vue';
import { EnterIcon, BookmarkIcon, PinIcon, CloudUploadIcon } from 'tdesign-icons-vue-next';
import { ActionSheet, ActionSheetItem } from 'tdesign-mobile-vue';

const visible = ref(false);
const descVisible = ref(false);
const iconVisible = ref(false);
const badgeVisible = ref(false);
const baseData = {
  items: ['Move', 'Mark as important', 'Unsubscribe', 'Add to Tasks'],
};
const descData = {
  description: 'Email Settings',
  items: ['Move', 'Mark as important', 'Unsubscribe', 'Add to Tasks'],
};
const iconData = {
  description: 'Email Settings',
  items: [
    {
      label: 'Move',
      icon: () => h(EnterIcon),
    },
    {
      label: 'Mark as important',
      icon: () => h(BookmarkIcon),
    },
    {
      label: 'Unsubscribe',
      icon: h(PinIcon),
    },
    {
      label: 'Add to Tasks',
      icon: h(CloudUploadIcon),
    },
  ],
};
const badgeData = {
  description: 'Email Settings',
  items: [
    {
      label: 'Move',
      badge: { dot: true },
    },
    {
      label: 'Mark as important',
      badge: { count: 8, offset: [-6, 2] },
    },
    {
      label: 'Unsubscribe',
      badge: { count: 99, offset: [-6, 2] },
    },
    {
      label: 'Add to Tasks',
      badge: { count: 1000, offset: [-10, 2] },
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
    cancelText: 'cancel',
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
