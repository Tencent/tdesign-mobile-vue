<template>
  <div class="action-sheet-demo">
    <t-button block variant="outline" size="large" @click="visible = true">宫格型-多页</t-button>
  </div>
  <t-action-sheet
    v-model="visible"
    type="grid"
    :items="items"
    :count="count"
    @selected="handleSelected"
    @cancel="handleCancel"
  >
  </t-action-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ActionSheetItem } from '../type';

const items = ref([
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
  { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
]);
const visible = ref(false);
const count = ref(8);

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
