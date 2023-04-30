<template>
  <div :class="classes" @click="clickBackBtn">
    <t-node :content="iconTNode" />
    <span v-if="text" :class="`${name}__text--${theme}`">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, h } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { BacktopIcon as TIconBackTop } from 'tdesign-icons-vue-next';

import { useEmitEvent, renderTNode, TNode } from '../shared';
import BackTopProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-back-top`;
export default defineComponent({
  name,
  components: { TNode },
  props: BackTopProps,
  setup(props, context) {
    const emitEvent = useEmitEvent(props, context.emit);
    const el = computed(() => {
      return props.target ? props.target() : window.document.documentElement;
    });
    const { top } = useElementBounding(el);
    const classes = computed(() => {
      return {
        [`${name}`]: true,
        [`${name}--fixed`]: props.fixed,
        [`${name}--${props.theme}`]: true,
      };
    });

    const internalInstance = getCurrentInstance();
    const backTopIcon = h(TIconBackTop, { size: '22px' });
    const iconTNode = computed(() => {
      if (context.slots?.icon || typeof props.icon === 'function') {
        return renderTNode(internalInstance, 'icon');
      }
      return backTopIcon;
    });

    const clickBackBtn = () => {
      window.document.documentElement.scrollTop += top.value;
      emitEvent('to-top');
    };
    return {
      name,
      classes,
      iconTNode,
      el,
      top,
      clickBackBtn,
    };
  },
});
</script>
