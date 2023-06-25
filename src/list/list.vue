<template>
  <div ref="root" :class="name" @scroll="handleScroll">
    <t-node :content="headerContent" />
    <slot />
    <div :class="`${name}__loading--wrapper`" @click.stop="onLoadMore">
      <t-loading
        v-if="typeof asyncLoading === 'string' && ['loading', 'load-more'].includes(asyncLoading)"
        :indicator="asyncLoading === 'loading'"
        :text="typeof asyncLoading === 'string' ? LOADING_TEXT_MAP[asyncLoading] : ''"
        :class="`${name}__loading`"
      />
    </div>
    <t-node :content="footerContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance } from 'vue';
import { useWindowSize, useEventListener } from '@vueuse/core';
import TLoading from '../loading';
import config from '../config';
import ListProps from './props';
import { renderTNode, TNode, useScrollParent } from '../shared';

const { prefix } = config;
const name = `${prefix}-list`;
const LOADING_TEXT_MAP = {
  loading: '加载中...',
  'load-more': '点击加载更多',
};

export default defineComponent({
  name,
  components: {
    TLoading,
    TNode,
  },
  props: ListProps,
  emits: ['load-more', 'scroll'],
  setup(props, context) {
    const root = ref<HTMLElement>();
    const empty = ref<HTMLElement>();
    const scrollParent = useScrollParent(root);
    const { height } = useWindowSize();
    const internalInstance = getCurrentInstance();

    const headerContent = computed(() => renderTNode(internalInstance, 'header'));
    const footerContent = computed(() => renderTNode(internalInstance, 'footer'));

    const onLoadMore = (e: MouseEvent) => {
      if (props.asyncLoading === 'load-more') {
        props.onLoadMore?.();
      }
    };

    const handleScroll = (e: WheelEvent | Event) => {
      const scrollHeight =
        (e.target as HTMLElement).scrollHeight ||
        Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      const scrollTop =
        (e.target as HTMLElement).scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
      const offsetHeight = (e.target as HTMLElement).offsetHeight || height.value;

      props.onScroll?.(scrollHeight - (scrollTop + offsetHeight), scrollTop);
    };

    useEventListener(scrollParent, 'scroll', handleScroll);

    return {
      name,
      root,
      empty,
      onLoadMore,
      handleScroll,
      headerContent,
      footerContent,
      LOADING_TEXT_MAP,
    };
  },
});
</script>
