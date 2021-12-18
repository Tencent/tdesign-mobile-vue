<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">ActionSheet 动作面板</h1>
    <p class="summary">从底部弹出的模态框，提供和当前场景相关的操作动作，也支持提供信息输入和描述。</p>
    <tdesign-demo-block title="类型" summary="列表型">
      <div class="action-sheet-demo">
        <t-button variant="outline" size="large" @click="visible = true">列表型</t-button>
      </div>
    </tdesign-demo-block>
    <tdesign-demo-block summary="宫格型">
      <div class="action-sheet-demo">
        <t-button variant="outline" size="large" @click="handleShowGridLine(6)">宫格型-单页宫格</t-button>
        <t-button variant="outline" size="large" @click="handleShowGrid(6)">宫格型-多页宫格</t-button>
      </div>
    </tdesign-demo-block>
  </div>

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
  />
  <t-action-sheet
    v-model="visible3"
    type="grid"
    :items="items3"
    :count="count"
    @select="handleSelect"
    @cancel="handleCancel"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ActionSheetItem } from '../type';

export default defineComponent({
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      items: [
        '默认按钮',
        { label: '自定义按钮', color: '#0052D9' },
        { label: '失效按钮', disabled: true },
        { label: '告警按钮', color: '#E34D59' },
      ],
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
    handleSelect(selected: ActionSheetItem, selectedIndex: number) {
      console.log(selected, selectedIndex);
    },
    handleCancel(): void {
      console.log('cancel');
    },
    handleShowGridLine(count: number) {
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
