import { defineComponent, ref } from 'vue';
import { useWindowSize, useEventListener } from '@vueuse/core';
import { useTNodeJSX } from '../hooks/tnode';
import TLoading from '../loading';
import config from '../config';
import ListProps from './props';
import { useScrollParent } from '../shared';
import { useConfig } from '../config-provider/useConfig';

const { prefix } = config;
const name = `${prefix}-list`;

export default defineComponent({
  name,
  components: {
    TLoading,
  },
  props: ListProps,
  emits: ['load-more', 'scroll'],
  setup(props, { slots }) {
    const { globalConfig } = useConfig('list');
    const renderTNodeJSX = useTNodeJSX();

    const LOADING_TEXT_MAP = {
      loading: globalConfig.value.loading,
      'load-more': globalConfig.value.loadingMoreText,
    };

    const root = ref<HTMLElement>();
    const scrollParent = useScrollParent(root);
    const { height } = useWindowSize();

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
    return () => {
      const headerContent = renderTNodeJSX('header');
      const footerContent = renderTNodeJSX('footer');
      return (
        <div ref={root} class={name} onScroll={handleScroll}>
          {headerContent}
          {slots.default && slots.default()}
          <div class={`${name}__loading--wrapper`} onClick={onLoadMore}>
            {typeof props.asyncLoading === 'string' && ['loading', 'load-more'].includes(props.asyncLoading) && (
              <TLoading
                indicator={props.asyncLoading === 'loading'}
                text={typeof props.asyncLoading === 'string' ? LOADING_TEXT_MAP[props.asyncLoading] : ''}
                class={`${name}__loading`}
              />
            )}
          </div>
          {footerContent}
        </div>
      );
    };
  },
});
