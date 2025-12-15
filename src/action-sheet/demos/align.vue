<template>
  <div class="action-sheet-demo">
    <t-button block variant="outline" theme="primary" @click="centerVisible = true">居中列表型</t-button>
    <t-button block variant="outline" theme="primary" @click="leftVisible = true">左对齐列表型</t-button>
  </div>
  <t-action-sheet
    v-model="centerVisible"
    :items="items"
    description="Email Settings"
    cancel-text="cancel"
    @selected="handleSelected"
    @cancel="handleCancel"
  >
  </t-action-sheet>
  <t-action-sheet
    v-model="leftVisible"
    align="left"
    :items="items"
    description="Email Settings"
    cancel-text="cancel"
    @selected="handleSelected"
    @cancel="handleCancel"
  >
  </t-action-sheet>
</template>

<script lang="ts" setup>
import { ref, h } from 'vue';
import { EnterIcon, BookmarkIcon, PinIcon, CloudUploadIcon } from 'tdesign-icons-vue-next';
import { ActionSheetItem } from 'tdesign-mobile-vue';

const items = ref([
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
]);
const centerVisible = ref(false);
const leftVisible = ref(false);

const handleSelected = (selected: ActionSheetItem | string, selectedIndex: number) => {
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
