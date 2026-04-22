<template>
  <div class="typography-ellipsis-demo"></div>
  <div>
    <div class="tdesign-mobile-typography-demo">
      <t-typography-paragraph ellipsis>{{ content }}</t-typography-paragraph>
    </div>
    <div class="tdesign-mobile-typography-demo">
      <t-typography-paragraph :ellipsis="ellipsisExpandable">{{ content }}</t-typography-paragraph>
    </div>
    <div class="tdesign-mobile-typography-demo">
      <t-typography-paragraph :ellipsis="ellipsisCustomSuffix">{{ content }}</t-typography-paragraph>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { ChevronDownIcon } from 'tdesign-icons-vue-next';

const content = `TDesign 秉承开放的设计理念从创立之初就采用开源协作的方式进行设计和开发。协作方案讨论、组件设计以及 API 设计，包括源代码在内均在公司内部完全开放，赢得了内部开发者和设计师的广泛关注。TDesign 遵循平等、开放、严格的原则，不论参与者的角色如何。`;

const ellipsisExpandable = {
  row: 2,
  expandable: true,
  collapsible: true,
  onExpand: (expanded: boolean) => {
    console.log(`触发 expand 事件，当前状态：${expanded ? '展开' : '收起'}`);
  },
};

const ellipsisCustomSuffix = {
  row: 1,
  suffix: <ChevronDownIcon />,
  expandable: true,
  collapsible: false,
  onExpand: () => {
    console.log(`触发 expand 事件`);
  },
};
</script>

<style scoped lang="less">
.tdesign-mobile-typography-demo {
  position: relative;
  display: flex;
  padding: 0 16px;
  background-color: var(--bg-color-demo, #fff);

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    border-bottom: 1px solid var(--td-stroke-color, #e7e7e7);
    transform: scaleY(0.5);
  }
}
</style>
