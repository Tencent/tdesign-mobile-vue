<template>
  <div :class="classes" @click="clickBackBtn">
    <t-node v-if="iconTNode" :content="iconTNode" />
    <span v-if="text" :class="`${name}__text--${theme}`">{{ text }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, h } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { BacktopIcon as TIconBackTop } from 'tdesign-icons-vue-next';

import { renderTNode, TNode, isBrowser } from '../shared';
import BackTopProps from './props';
import config from '../config';

const { prefix } = config;
const name = `${prefix}-back-top`;
export default defineComponent({
  name,
  components: { TNode },
  props: BackTopProps,
  setup(props, context) {
    const el = computed(() => {
      if (!isBrowser) return undefined;
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
      return props.icon ? backTopIcon : false;
    });

    const clickBackBtn = () => {
      if (isBrowser) {
        window.document.documentElement.scrollTop += top.value;
        props.onToTop?.();
      }
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
