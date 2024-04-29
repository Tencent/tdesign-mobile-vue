import { defineComponent, getCurrentInstance, ComponentPublicInstance, computed, inject, onUnmounted } from 'vue';
import TBadge from '../badge';
import SideBarItemProps from './side-bar-item-props';
import { TdSideBarItemProps } from './type';
import { useTNodeJSX } from '../hooks/tnode';

import config from '../config';

const { prefix } = config;
const name = `${prefix}-side-bar-item`;

export default defineComponent({
  name,
  components: { TBadge },
  props: SideBarItemProps,
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const internalInstance = getCurrentInstance();
    const proxy = internalInstance.proxy as ComponentPublicInstance<TdSideBarItemProps>;
    const sideBarProvide: any = inject('sideBarProvide', undefined);
    sideBarProvide.relation(proxy);

    const isActive = computed(() => proxy.value === sideBarProvide.currentValue.value);

    const rootClassName = computed(() => [
      name,
      { [`${name}--active`]: isActive.value },
      { [`${name}--disabled`]: props.disabled },
      context.attrs.class || '',
    ]);

    const onClick = (e: MouseEvent) => {
      sideBarProvide.onClickItem(proxy.value, props.label);
    };

    onUnmounted(() => {
      sideBarProvide.removeRelation(proxy);
    });

    return () => {
      const { badgeProps, label } = props;
      const renderIconNode = () => {
        const iconNode = renderTNodeJSX('icon');
        if (!iconNode) {
          return null;
        }
        return <div class={`${name}__icon`}>{iconNode}</div>;
      };
      return (
        <div class={rootClassName.value} onClick={onClick}>
          {isActive.value && (
            <div>
              <div class={`${name}__line`}></div>
              <div class={`${name}__prefix`}></div>
              <div class={`${name}__suffix`}></div>
            </div>
          )}
          {renderIconNode()}
          {badgeProps ? <t-badge {...badgeProps} content={label}></t-badge> : <div>{label}</div>}
        </div>
      );
    };
  },
});
