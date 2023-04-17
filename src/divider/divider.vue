<template>
  <div role="separator" :class="{ [`${name}--vertical-center`]: layout === 'vertical' }">
    <div :class="dividerClass" :style="`border-color:${lineColor}`">
      <div :class="`${name}__content`">
        <t-node :content="dividerContent" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, toRefs, defineComponent, getCurrentInstance } from 'vue';
import { renderContent, TNode } from '../shared';
import DividerProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-divider`;

export default defineComponent({
  name,
  components: { TNode },
  props: DividerProps,
  setup(props) {
    const internalInstance = getCurrentInstance();
    const dividerContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const dividerClass = computed(() => [
      `${name}`,
      `${name}--${props.layout}`,
      `${name}--${props.align}`,
      {
        [`${name}--dashed`]: props.dashed,
      },
    ]);

    return {
      name,
      ...toRefs(props),
      dividerContent,
      dividerClass,
    };
  },
});
</script>
