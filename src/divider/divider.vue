<template>
  <div role="separator" :class="dividerClass">
    <t-node :content="dividerContent" />
  </div>
</template>
<script lang="ts">
import { computed, toRefs, defineComponent, getCurrentInstance, h } from 'vue';
import { renderContent, TNode } from '@/shared';
import DividerProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-divider`;

export default defineComponent({
  name,
  components: { TNode },
  props: DividerProps,
  setup(props, context) {
    const internalInstance = getCurrentInstance();
    const dividerContent = computed(() => renderContent(internalInstance, 'default', 'content'));
    const dividerClass = computed(() => [
      `${name}`,
      `${name}--hairline`,
      {
        [`${name}--content-${props.align}`]: dividerContent.value,
        [`${name}--dashed`]: props.dashed,
        [`${name}-vertical`]: props.layout === 'vertical',
      },
    ]);

    return {
      dividerContent,
      dividerClass,
    };
  },
});
</script>
