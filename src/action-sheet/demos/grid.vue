<template>
  <div class="action-sheet-base">
     <t-cell>
        <t-button variant="outline" size="large"  @click="handleShowGrid(8)">显示</t-button>
     </t-cell>
     <t-cell>
        <t-button variant="outline" size="large"  @click="handleShowGrid(4)">每页显示4个</t-button>
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
        <div class="meun-icon" :style="{ backgroundImage: `url(${slotProps.item.icon})` }"></div>
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
      items: [
        { label: '好友', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_wJGhiFOIqj.png' },
        { label: 'QQ空间', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_l52cYNXlSu.png' },
        { label: '朋友圈', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185651_4juY5FhLUl.png' },
        { label: '微信', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_viFbdQ0nOd.png' },
        { label: '下载', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_OkBzC8u4lX.png' },
        { label: '好友', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_wJGhiFOIqj.png' },
        { label: 'QQ空间', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_l52cYNXlSu.png' },
        { label: '朋友圈', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185651_4juY5FhLUl.png' },
        { label: '微信', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_viFbdQ0nOd.png' },
        { label: '下载', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_OkBzC8u4lX.png' },
      ],
      count: 8,
    };
  },
  methods: {
    handleSelect(selected: ItemType, selectedIndex: number) {
      console.log(selected, selectedIndex);
    },
    handleCancel() {
      console.log('cancel');
    },
    handleShowGrid(count: number) {
      this.count = count;
      this.visible = true;
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
