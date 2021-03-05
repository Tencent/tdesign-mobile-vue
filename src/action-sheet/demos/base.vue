<template>
  <div class="action-sheet-base">
    <t-cell-group>
      <t-cell value-align="left">
        <t-button theme="primary" size="large" @click="visible = true">列表型</t-button>
        <t-button theme="primary" size="large"  @click="handleShowGridLine(8)">宫格型-单页宫格</t-button>
        <t-button theme="primary" size="large" @click="handleShowGrid(4)">宫格型-多页宫格</t-button>
      </t-cell>
    </t-cell-group>
    <t-action-sheet v-model="visible" :items="items" @select="handleSelect" @cancel="handleCancel" />
    <t-action-sheet
      v-model="visible1"
      :items="items"
      :show-cancel="false"
      @select="handleSelect"
      @cancel="handleCancel"
    />
    <t-action-sheet
      v-model="visible2"
      type="grid"
      :items="items2"
      :count="count"
      @select="handleSelect"
      @cancel="handleCancel"
    >
      <template #cell="slotProps">
        <div class="action-sheet-meun-icon" :style="{ backgroundImage: `url(${slotProps.item.icon})` }"></div>
        <div>{{ slotProps.item.label }}</div>
      </template>
    </t-action-sheet>
    <t-action-sheet
      v-model="visible3"
      type="grid"
      :items="items3"
      :count="count"
      @select="handleSelect"
      @cancel="handleCancel"
    >
      <template #cell="slotProps">
        <div class="action-sheet-meun-icon" :style="{ backgroundImage: `url(${slotProps.item.icon})` }"></div>
        <div>{{ slotProps.item.label }}</div>
      </template>
    </t-action-sheet>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ItemType } from '../action-sheet.interface';

export default defineComponent({
  data() {

    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      items: ['按钮一', '按钮二', { label: '失效按钮', disabled: true }, { label: '告警按钮', color: 'red' }],
      items1: [
        { label: '确定', color: '#0052d9' },
        { label: '删除', color: 'red' },
      ],
      items2: [
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
        { label: '文字', icon: 'https://sola.gtimg.cn/aoi/sola/20210202154301_WqMVBt9mQS.png' },
      ],
      items3: [
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
    handleSelect(selected: ItemType, selectedIndex: number) {
      console.log(selected, selectedIndex);
    },
    handleCancel(): void {
      console.log('cancel');
    },
    handleShowGridLine(count: number){
       this.count = count;
      this.visible2 = true;
    },
    handleShowGrid(count: number) {
      this.count = count;
      this.visible3 = true;
    },
  },
});
</script>

<style lang="less">
.action-sheet-meun-icon {
  width: 36px;
  height: 36px;
  margin-bottom: 4px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.action-sheet-base button{
  margin-bottom: 16px;

}
</style>
