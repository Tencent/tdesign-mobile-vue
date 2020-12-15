<template>
  <div class="action-sheet-base">
    <t-cell-group title="表格型展示">
      <t-cell value-align="left">
        <t-button theme="primary" @click="handleShowGrid(8)">显示</t-button>
        <t-button theme="primary" style="margin-left: 8px;" @click="handleShowGrid(4)">每页显示4个</t-button>
      </t-cell>
    </t-cell-group>
    <t-action-sheet
      type="grid"
      v-model="visible"
      :items="items"
      :count="count"
      @select="handleSelect"
      @cancel="handleCancel"
    >
      <template v-slot:cell="slotProps">
        <div class="meun-icon" :style="{backgroundImage: `url(${slotProps.item.icon})`}"></div>
        <div>{{slotProps.item.label}}</div>
      </template>
    </t-action-sheet>
  </div>
</template>

<script>
export default {
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
    handleSelect(selected, selectedIndex) {
      console.log(selected, selectedIndex);
    },
    handleCancel() {
      console.log('cancel');
    },
    handleShowGrid(count) {
      this.count = count;
      this.visible = true;
    },
  },
};
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
