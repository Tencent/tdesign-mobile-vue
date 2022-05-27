<template>
  <div ref="boxRef" :class="boxClasses" :style="boxStyles">
    <div ref="contentRef" class="t-indexes__anchor" :style="anchorStyle">
      <t-node :content="stickyContent"></t-node>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, defineComponent } from 'vue';
import { useElementBounding, templateRef } from '@vueuse/core';
import config from '../config';
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
    const stickyContent = computed(() => renderContent(getCurrentInstance(), 'default', ''));

    // box 用于占位和记录边界
    // content 用于实际定位
    const boxRef = templateRef('boxRef');
    const contentRef = templateRef('contentRef');
    const { height } = useElementBounding(contentRef);

    const boxStyles = computed(() => `height:${height.value}px;`);

    return {
      boxClasses,
      boxStyles,
      stickyContent,
    };
  },
});
</script>
