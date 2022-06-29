<template>
  <div ref="root" :class="name" @scroll="handleScroll">
    <t-node :content="headerContent" />
    <slot />
    <div @click.stop="onLoadMore">
      <t-loading
        v-if="typeof asyncLoading === 'string' && ['loading', 'loadingMore'].includes(asyncLoading)"
        :loading="asyncLoading === 'loading'"
        :text="typeof asyncLoading === 'string' ? LOADING_TEXT_MAP[asyncLoading] : ''"
        :class="`${name}__loading`"
      />
    </div>
    <t-node :content="footerContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, getCurrentInstance } from 'vue';
import TLoading from '../loading';
import config from '../config';
import ListProps from './props';
import { renderTNode, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-list`;
const LOADING_TEXT_MAP = {
  loading: '加载中...',
  'loading-more': '点击加载更多',
};

export default defineComponent({
  name,
  components: {
    TLoading,
    TNode,
  },
  props: ListProps,
  emits: ['load-more', 'scroll'],
  setup(props, { emit }) {
    const root = ref<HTMLElement>();
    const empty = ref<HTMLElement>();

    const internalInstance = getCurrentInstance();

    const headerContent = computed(() => renderTNode(internalInstance, 'header'));
    const footerContent = computed(() => renderTNode(internalInstance, 'footer'));

    const onLoadMore = (e: MouseEvent) => {
      if (props.asyncLoading === 'loading-more') {
        emit('load-more', { e });
        if (props.onLoadMore) {
          props.onLoadMore();
        }
      }
    };

    return {
      name,
      root,
      empty,
      onLoadMore,
      headerContent,
      footerContent,
      LOADING_TEXT_MAP,
    };
  },
  methods: {
    handleScroll(e: WheelEvent | Event) {
      const listElement = this.$el as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      this.$emit('scroll', {
        $event: e,
        scrollTop,
        scrollBottom: scrollHeight - clientHeight - scrollTop,
      });
      if (this.onScroll) {
        this.onScroll({
          e,
          scrollTop,
          scrollBottom: scrollHeight - clientHeight - scrollTop,
        });
      }
    },
  },
});
</script>
