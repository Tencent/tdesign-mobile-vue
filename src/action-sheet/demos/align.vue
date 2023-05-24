<template>
  <div class="action-sheet-demo">
    <t-button block variant="outline" theme="primary" @click="centerVisible = true">居中列表型</t-button>
    <t-button block variant="outline" theme="primary" @click="leftVisible = true">左对齐列表型</t-button>
  </div>
  <t-action-sheet
    v-model="centerVisible"
    :items="items"
    description="动作面板描述文字"
    @selected="handleSelected"
    @cancel="handleCancel"
  >
  </t-action-sheet>
  <t-action-sheet
    v-model="leftVisible"
    align="left"
    :items="items"
    description="动作面板描述文字"
    @selected="handleSelected"
    @cancel="handleCancel"
  >
  </t-action-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ActionSheetItem } from '../type';

const items = ref([{ label: '选项1' }, { label: '选项2' }, { label: '选项3' }, { label: '选项4' }]);
const centerVisible = ref(false);
const leftVisible = ref(false);

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
