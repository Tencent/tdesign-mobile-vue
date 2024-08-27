import { defineComponent, getCurrentInstance, ComponentPublicInstance, computed, inject, onUnmounted } from 'vue';
import props from './side-bar-item-props';
import { TdSideBarItemProps } from './type';
import TBadge from '../badge';
import { useTNodeJSX } from '../hooks/tnode';

import config from '../config';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-side-bar-item`,
  props,
  setup(props) {
    const sideBarItemClass = usePrefixClass('side-bar');
    const renderTNodeJSX = useTNodeJSX();
    const internalInstance = getCurrentInstance();
    const proxy = internalInstance.proxy as ComponentPublicInstance<TdSideBarItemProps>;
    const sideBarProvide: any = inject('sideBarProvide', undefined);
    sideBarProvide.relation(proxy);

    const isActive = computed(() => proxy.value === sideBarProvide.currentValue.value);

    const rootClassName = computed(() => [
      sideBarItemClass.value,
      { [`${sideBarItemClass.value}--active`]: isActive.value },
      { [`${sideBarItemClass.value}--disabled`]: props.disabled },
    ]);

    const onClick = (e: MouseEvent) => {
      if (props.disabled) return;
      sideBarProvide.onClickItem(proxy.value, props.label);
    };

    onUnmounted(() => {
      sideBarProvide.removeRelation(proxy);
    });

    return () => {
      const renderIconNode = () => {
        const iconNode = renderTNodeJSX('icon');
        if (!iconNode) {
          return null;
        }
        return <div class={`${sideBarItemClass.value}__icon`}>{iconNode}</div>;
      };
      return (
        <div class={rootClassName.value} onClick={onClick}>
          {isActive.value && (
            <div>
              <div class={`${sideBarItemClass.value}__line`}></div>
              <div class={`${sideBarItemClass.value}__prefix`}></div>
              <div class={`${sideBarItemClass.value}__suffix`}></div>
            </div>
          )}
          {renderIconNode()}
          {props.badgeProps ? (
            <TBadge {...(props.badgeProps as TdSideBarItemProps['badgeProps'])} content={props.label} />
          ) : (
            <div>{props.label}</div>
          )}
        </div>
      );
    };
  },
});
