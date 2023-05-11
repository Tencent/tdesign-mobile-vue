<template>
  <div ref="boxRef" :class="boxClasses">
    <div ref="contentRef" class="t-indexes__anchor" :style="anchorStyle">
      <t-node :content="stickyContent"></t-node>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, defineComponent, inject, InjectionKey } from 'vue';
import { templateRef } from '@vueuse/core';
import config from '../config';
import IndexesProps from './props';

import { renderContent, TNode } from '../shared';

const name = `${config.prefix}-indexes-anchor`;

export default defineComponent({
  name,
  components: { TNode },
  props: {
    anchorStyle: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const boxClasses = name;
    const indexesProvide = inject('indexesProvide') as typeof IndexesProps;
    const contentClass = computed(() => [`${name}____wrapper`]);
    const stickyContent = computed(() => renderContent(getCurrentInstance(), 'default', ''));

    // box 用于占位和记录边界
    // content 用于实际定位
    const boxRef = templateRef('boxRef');
    const contentRef = templateRef('contentRef');

    return {
      boxClasses,
      stickyContent,
    };
  },
});
</script>
