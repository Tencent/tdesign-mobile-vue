<template>
  <div class="action-sheet-base">
    <t-cell-group title="基础用法">
      <t-cell value-align="left">
        <t-button theme="primary" @click="visible = true">显示</t-button>
        <t-button theme="primary" style="margin-left: 8px;" @click="visible1 = true">带取消选项</t-button>
        <t-button theme="primary" style="margin-left: 8px;" @click="visible2 = true">自定义选项颜色</t-button>
      </t-cell>
    </t-cell-group>
    <t-cell-group title="表格型展示">
      <t-cell value-align="left">
        <t-button theme="primary" @click="visible3 = true">显示</t-button>
      </t-cell>
    </t-cell-group>
    <t-action-sheet
      v-model="visible"
      :items="items"
      @select="handleSelect"
      @cancel="handleCancel"
    />
    <t-action-sheet
      v-model="visible1"
      :items="items"
      show-cancel
      @select="handleSelect"
      @cancel="handleCancel"
    />
    <t-action-sheet
      v-model="visible2"
      :items="items1"
      show-cancel
      @select="handleSelect"
      @cancel="handleCancel"
    />
    <t-action-sheet-grid
      type="grid"
      v-model="visible3"
      :items="items2"
      show-cancel
      @select="handleSelect"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      items: ['按钮一', '按钮二', { label: '失效按钮', disabled: true }, { label: '告警按钮', color: 'red' }],
      items1: [{ label: '确定', color: '#0052d9' }, { label: '删除', color: 'red' }],
      items2: [
        { label: '好友', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_wJGhiFOIqj.png' },
        { label: 'QQ空间', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_l52cYNXlSu.png' },
        { label: '朋友圈', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185651_4juY5FhLUl.png' },
        { label: '微信', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_viFbdQ0nOd.png' },
        { label: '下载', icon: 'https://qzonestyle.gtimg.cn/aoi/sola/20200327185457_OkBzC8u4lX.png' },
      ],
    };
  },
  methods: {
    handleSelect(selected, selectedIndex) {
      console.log(selected, selectedIndex);
    },
    handleCancel() {
      console.log('cancel');
    },
  },
};
</script>
