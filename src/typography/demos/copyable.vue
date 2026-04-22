<template>
  <div>
    <div class="tdesign-mobile-typography-demo">
      <t-typography-text copyable>This is a copyable text.</t-typography-text>
    </div>
    <div class="tdesign-mobile-typography-demo">
      <t-typography-text :copyable="copyableWithCustomSuffix">
        This is a copyable text with custom icon.
      </t-typography-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SmileIcon } from 'tdesign-icons-vue-next';

const copyableWithCustomSuffix = {
  suffix: (h: typeof import('vue').h) => h(SmileIcon, { color: '#00529D' }),
  onCopy: () => {
    console.log('触发 copy 事件，已复制文本');
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
