<template>
  <div>
    <t-collapse expand-mutex>
      <t-collapse-panel v-for="(p, i) in panelOthers" :key="i" v-bind="p"></t-collapse-panel>
    </t-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const panelOthersValue = [
  {
    header: '基础面板',
    value: 'base',
    content:
      '此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容',
  },
  {
    header: '仅点击面板右侧按钮展开',
    value: 'demoOnlyIconClicable',
    expandOnRowClick: false,
    content: '点击面板右侧按钮展开/折叠',
  },
  {
    header: '面板右侧内容扩展',
    value: 'rightContent',
    content:
      '此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容',
  },
  {
    header: '禁用项',
    value: 'demoDisabled',
    disabled: true,
    headerRightContent: '收起',
  },
];
const panelOthers = ref(panelOthersValue);
</script>
