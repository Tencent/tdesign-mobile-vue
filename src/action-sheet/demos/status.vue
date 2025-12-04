<template>
  <div class="action-sheet-demo">
    <t-button block variant="outline" theme="primary" @click="visible = true">列表型选项状态</t-button>
  </div>
  <t-action-sheet
    v-model="visible"
    :items="iconData.items"
    cancel-text="cancel"
    @selected="handleSelected"
    @cancel="handleCancel"
  />
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { EnterIcon, BookIcon, PinIcon, CloudUploadIcon } from 'tdesign-icons-vue-next';
import { ActionSheetItem } from 'tdesign-mobile-vue';

const visible = ref(false);
const iconData = {
  description: '列表型选项状态',
  items: [
    {
      label: 'Move',
      icon: () => h(EnterIcon),
    },
    {
      label: 'Mark as important',
      icon: () => h(BookIcon),
      color: '#0052D9',
    },
    {
      label: 'Unsubscribe',
      icon: h(PinIcon),
      color: '#E34D59',
    },
    {
      label: 'Add to Tasks',
      icon: h(CloudUploadIcon),
      disabled: true,
    },
  ],
};

const handleSelected = (selected: ActionSheetItem, selectedIndex: number) => {
  console.log('[handleSelected]', { selected, selectedIndex });
};
const handleCancel = (): void => {
  console.log('[handleCancel]');
};
</script>
<style lang="less" scoped>
.action-sheet-demo {
  margin-bottom: 16px;
}
</style>
