<template>
  <div v-show="showSticky" :class="stickyClasses" :style="stickyStyles">
    <t-node :content="stickyContent"></t-node>
  </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, defineComponent } from 'vue';
import props from './props';
import config from '../config';
import { renderContent, useEmitEvent } from '@/shared';

const name = `${config.prefix}-sticky`;

export default defineComponent({
  name,
  props,
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);

    const showSticky = computed(() => props.disabled);
    const stickyClasses = computed(() => [`${name}`, {}]);
    const stickyStyles = computed(() => {
      return {
        top: `${props.offsetTop}px`,
        'z-index': Number(props.zIndex),
      };
    });
    const stickyContent = computed(() => renderContent(getCurrentInstance(), 'default', 'content'));
    return {
      showSticky,
      stickyClasses,
      stickyStyles,
      stickyContent,
    };
  },
});
</script>
