<template>
  <div class="accordion-demo">
    <t-collapse title="手风琴模式" accordion>
      <t-collapse-panel key="0" v-bind="panelOthers[0]"></t-collapse-panel>
      <t-collapse-panel key="1" v-bind="panelOthers[1]"></t-collapse-panel>
      <t-collapse-panel key="2" v-bind="panelOthers[2]"></t-collapse-panel>
      <t-collapse-panel key="3" v-bind="panelOthers[3]">自定义内容</t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script>
import { reactive, toRefs, defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const panels = [
      {
        title: '基础面板',
        name: '0',
        content:
          '一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字',
      },
      {
        title: '内容列表',
        name: '1',
        content: ['一段很长很长的内容文字', '一段很长很长的内容文字', '一段很长很长的内容文字'],
      },
      {
        title: '内容带标签',
        extra: '预设文本',
        content: [
          { label: '标题1', content: '预设文本' },
          { label: '类目标题2', content: '预设文本' },
          {
            label: '很长很长很长的内容标题',
            content: '一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字',
          },
        ],
      },
      {
        title: '内容带标签 - 宽度固定',
        extra: '预设文本',
        labelWidth: 80,
        content: [
          { label: '标题1', content: '预设文本' },
          {
            label: '很长很长很长的内容标题',
            content: '一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字',
          },
        ],
      },
    ];
    const panelOthers = [
      {
        title: '仅点击右侧按钮展开',
        name: '0',
        headerClickable: true,
        content:
          '一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字',
      },
      {
        title: '仅点击右侧按钮展开',
        name: 'demoOnlyIconClicable',
        headerClickable: false,
        content: '点击面板右侧按钮展开/折叠',
      },
      {
        title: '禁用项',
        name: 'demoDisabled',
        disabled: true,
        content: '预设文本',
      },
      {
        title: '内容默认slot',
        name: 'slotContent',
      },
    ];
    const state = reactive({
      valueBase: ['0', 3],
      panels,
      panelOthers,
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="less">
.accordion-demo {
  background-color: #f9f9f9;
}
</style>
