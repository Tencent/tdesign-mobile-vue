<template>
  <div class="tdesign-mobile-demo">
    <h1 class="title">Collapse 折叠面板</h1>
    <p class="summary">在折叠面板中放入内容，点击面板的标题可以展开或收缩其内容。</p>
    <tdesign-demo-block header="01 类型" summary="基础型">
      <baseVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="手风琴模式">
      <accordionVue />
    </tdesign-demo-block>
    <tdesign-demo-block summary="更多（默认全部展开）">
      <t-collapse expand-all>
        <t-collapse-panel name="demoCustom">
          <template #header
            >自定义标题<span style="color: #ccc; font-size: 12px; margin-left: 6px">自定义内容</span></template
          >
          <template #extra>
            <span style="color: red; font-size: 12px; margin-left: 6px; line-height: 1em">示例</span>
          </template>
          预设文本
        </t-collapse-panel>
      </t-collapse>
    </tdesign-demo-block>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';
import baseVue from './base.vue';
import accordionVue from './accordion.vue';

export default defineComponent({
  components: {
    baseVue,
    accordionVue,
  },
  setup() {
    const panels = [
      {
        header: '基础面板',
        name: '0',
        content:
          '一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字一段很长很长的内容文字',
      },
      {
        header: '内容列表',
        name: '1',
        content: ['一段很长很长的内容文字', '一段很长很长的内容文字', '一段很长很长的内容文字'],
      },
      {
        header: '内容带标签',
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
        header: '内容带标签 - 宽度固定',
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
        header: '仅点击右侧按钮展开',
        name: 'demoOnlyIconClicable',
        headerClickable: false,
        content: '点击面板右侧按钮展开/折叠',
      },
      {
        header: '禁用项',
        name: 'demoDisabled',
        disabled: true,
        content: '预设文本',
      },
      {
        header: '内容默认slot',
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
