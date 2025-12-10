import { defineComponent, ref, provide, Ref, computed, toRefs, VNode } from 'vue';
import TabBarProps from './props';
import config from '../config';
import useChildSlots from '../hooks/useChildSlots';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import useElementHeight from '../hooks/useElementHeight';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-tab-bar`,
  props: TabBarProps,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context) {
    const root = ref<HTMLElement>();
    const tabBarClass = usePrefixClass('tab-bar');

    const renderTNodeJSX = useTNodeJSX();

    const { value, modelValue } = toRefs(props);
    const [activeValue, setActiveValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const defaultIndex: Ref<number> = ref(-1);
    const itemCount = ref(0);

    const updateChild = (currentValue: number | string) => {
      setActiveValue(currentValue);
    };

    const rootClass = computed(() => [
      `${tabBarClass.value}`,
      {
        [`${tabBarClass.value}--bordered`]: props.bordered,
        [`${tabBarClass.value}--fixed`]: props.fixed,
        [`${tabBarClass.value}--safe`]: props.safeAreaInsetBottom,
      },
      `${tabBarClass.value}--${props.shape}`,
    ]);

    const { height: tabBarHeight } = useElementHeight(root, {
      immediate: props.fixed && props.placeholder,
    });

    provide('tab-bar', {
      ...toRefs(props),
      defaultIndex,
      activeValue,
      itemCount,
      updateChild,
    });

    // 在渲染函数中调用插槽函数并更新子节点数量
    const updateItemCount = (vNodes?: VNode[]) => {
      if (!vNodes || !Array.isArray(vNodes)) {
        itemCount.value = 0;
        return;
      }

      const childSlots = useChildSlots(`${prefix}-tab-bar-item`, vNodes);
      itemCount.value = childSlots.length;
    };

    return () => {
      const vNodes = context.slots.default ? context.slots.default() : [];
      updateItemCount(vNodes);

      const renderTabBar = (
        <div ref={root} class={rootClass.value} role="tablist">
          {renderTNodeJSX('default')}
        </div>
      );

      if (props.fixed && props.placeholder) {
        return (
          <div class={`${tabBarClass.value}__placeholder`} style={{ height: `${tabBarHeight.value}px` }}>
            {renderTabBar}
          </div>
        );
      }

      return renderTabBar;
    };
  },
});
