import { computed, defineComponent } from 'vue';
import { useElementBounding } from '@vueuse/core';
import { BacktopIcon as TIconBackTop } from 'tdesign-icons-vue-next';

import { isBrowser } from '../shared';
import BackTopProps from './props';
import config from '../config';
import { useTNodeJSX } from '@/hooks/tnode';
import { usePrefixClass } from '@/hooks/useClass';

const { prefix } = config;
const name = `${prefix}-back-top`;
export default defineComponent({
  name,
  props: BackTopProps,
  setup(props) {
    const renderTNodeJSX = useTNodeJSX();
    const backTopClass = usePrefixClass('back-top');

    const el = computed(() => {
      if (!isBrowser) return undefined;
      return props.target ? props.target() : window.document.documentElement;
    });
    const { top } = useElementBounding(el);
    const backTopClasses = computed(() => {
      return {
        [`${backTopClass.value}`]: true,
        [`${backTopClass.value}--fixed`]: props.fixed,
        [`${backTopClass.value}--${props.theme}`]: true,
      };
    });

    const handleClick = () => {
      if (isBrowser) {
        window.document.documentElement.scrollTop += top.value;
        props.onToTop?.();
      }
    };
    return () => {
      const readerIcon = () => {
        if (props.icon === true) {
          return <TIconBackTop size="22px"></TIconBackTop>;
        }

        return renderTNodeJSX('icon');
      };

      return (
        <div class={backTopClasses.value} onClick={handleClick}>
          {readerIcon()}
          {props.text && <span class={`${backTopClass.value}__text--${props.theme}`}>{props.text}</span>}
        </div>
      );
    };
  },
});
