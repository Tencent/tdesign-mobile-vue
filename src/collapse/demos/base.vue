<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Collapse 折叠面板</h1>
    <p class="summary">在折叠面板中放入内容，点击面板的标题可以展开或收缩其内容。</p>
    <tdesign-demo-block title="01 类型">
      <div class="accordion-demo">
        <t-collapse :value="valueBase" title="基础型">
          <t-collapse-panel v-for="(p, i) in panels" :key="i" :name="i" v-bind="p"> </t-collapse-panel>
        </t-collapse>

        <t-collapse title="手风琴模式" accordion>
          <t-collapse-panel key="0" v-bind="panels[0]"></t-collapse-panel>
          <t-collapse-panel key="1" v-bind="panelOthers[0]"></t-collapse-panel>
          <t-collapse-panel key="2" v-bind="panelOthers[1]"></t-collapse-panel>
          <t-collapse-panel key="3" v-bind="panelOthers[2]">自定义内容</t-collapse-panel>
        </t-collapse>

        <t-collapse title="更多（默认全部展开）" default-expand-all>
          <t-collapse-panel name="demoCustom">
            <template #title
              >自定义标题<span style="color: #ccc; font-size: 12px; margin-left: 6px">自定义内容</span></template
            >
            <template #extra>
              <span style="color: red; font-size: 12px; margin-left: 6px; line-height: 1em">示例</span>
            </template>
            预设文本
          </t-collapse-panel>
        </t-collapse>
      </div>
    </tdesign-demo-block>
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
