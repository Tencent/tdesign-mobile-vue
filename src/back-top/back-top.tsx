import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { BacktopIcon as TIconBackTop } from 'tdesign-icons-vue-next';

import { isBrowser } from '../shared';
import props from './props';
import config from '../config';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-back-top`,
  props,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const backTopClass = usePrefixClass('back-top');

    const target = computed(() => {
      if (!isBrowser) return undefined;
      return props.target ? props.target() : window.document.documentElement;
    });
    const container = ref<HTMLElement>();
    const { top } = useElementBounding(target);
    const visible = ref(false);
    const backTopClasses = computed(() => {
      return {
        [`${backTopClass.value}`]: true,
        [`${backTopClass.value}--fixed`]: props.fixed,
        [`${backTopClass.value}--${props.theme}`]: true,
      };
    });

    const handleClick = () => {
      if (isBrowser) {
        container.value.scrollTop = 0 + top.value;
        props.onToTop?.();
      }
    };
    const getContainer = (container: Function) => {
      if (typeof container === 'function') {
        return container();
      }
      return document.documentElement;
    };

    onMounted(() => {
      if (isBrowser) {
        container.value = getContainer(props.container);
        container.value.onscroll = () => {
          if (container.value?.scrollTop >= props.visibilityHeight) {
            visible.value = true;
          }
          if (visible.value && container.value?.scrollTop < props.visibilityHeight) {
            visible.value = false;
          }
        };
      }
    });

    onUnmounted(() => {
      container.value.onscroll = null;
    });

    const readerIcon = () => {
      if (props.icon === true) {
        return <TIconBackTop size="22px"></TIconBackTop>;
      }

      return renderTNodeJSX('icon');
    };
    return () => {
      return (
        <div class={backTopClasses.value} v-show={visible.value} onClick={handleClick}>
          {readerIcon()}
          {props.text && <span class={`${backTopClass.value}__text--${props.theme}`}>{props.text}</span>}
        </div>
      );
    };
  },
});
