<template>
  <t-collapse v-model:value="activeKey">
    <t-collapse-panel
      v-for="(p, i) in panels"
      :key="i"
      :name="i"
      :title="p.title"
      :content="p.content"
      :extra="p.extra">
    </t-collapse-panel>
  </t-collapse>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
  setup() {
    const panels = [
      {
        title: '标题',
        content: ['一段很长很长的内容文字', '一段很长很长的内容文字', '一段很长很长的内容文字'],
      },
      {
        title: '标题',
        extra: '预设文本',
        content: [
          { label: '类目标题', content: '预设文本' },
          { label: '类目标题', content: '预设文本' },
          { label: '类目标题', content: '预设文本' },
        ],
      },
      {
        title: '标题',
        content: '折叠面板可以作为容器容纳一段很长的文字或其他类型的内容，折叠面板可以作为容器容纳一段很长的文字或其他类型的内容，折叠面板可以作为容器容纳一段很长的文字或其他类型的内容，折叠面板可以作为容器容纳一段很长的文字或其他类型的内容，折叠面板可以作为容器容纳一段很长的文字或其他类型的内容，折叠面板可以作为容器容纳一段很长的文字或其他类型的内容。',
      },
    ];
    const state = reactive({
      activeKey: [],
      panels,
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
