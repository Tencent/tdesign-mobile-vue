<template>
  <div class="action-sheet-base">
    <t-cell>
      <t-button variant="outline" size="large" @click="handleShowGrid(8)">显示</t-button>
    </t-cell>
    <t-cell>
      <t-button variant="outline" size="large" @click="handleShowGrid(4)">每页显示4个</t-button>
    </t-cell>
    <t-action-sheet
      v-model="visible"
      type="grid"
      :items="items"
      :count="count"
      @select="handleSelect"
      @cancel="handleCancel"
    >
      <template #cell="slotProps">
        <div :style="meunIconStyle(slotProps.item.icon)"></div>
        <div>{{ slotProps.item.label }}</div>
      </template>
    </t-action-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ActionSheetItem } from '../type';

export default defineComponent({
  data() {
    return {
      visible: false,
      items: [
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
      ],
      count: 8,
    };
  },
  methods: {
    handleSelect(selected: ActionSheetItem, selectedIndex: number) {
      console.log(selected, selectedIndex);
    },
    handleCancel() {
      console.log('cancel');
    },
    handleShowGrid(count: number) {
      this.count = count;
      this.visible = true;
    },
    meunIconStyle(bg) {
      return {
        width: '36px',
        height: '36px',
        'margin-bottom': '4px',
        'background-size': 'contain',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        backgroundImage: `url(${bg})`,
      };
    },
  },
});
</script>

<style lang="less">
.action-sheet-base {
  .meun-icon {
    width: 36px;
    height: 36px;
    margin-bottom: 4px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
