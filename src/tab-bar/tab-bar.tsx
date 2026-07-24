import { defineComponent, ref, provide, inject, Ref, computed, toRefs, VNode, CSSProperties } from 'vue';
import TabBarProps from './props';
import useChildSlots from '../hooks/useChildSlots';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import useElementRect from '../hooks/useElementRect';
import { tabBarGlassDevContextKey, useTabBarGlassFilter } from './useTabBarGlassFilter';
import { renderTabBarGlassLayers } from './tab-bar-glass-layers';

export default defineComponent({
  name: 'TTabBar',
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
        [`${tabBarClass.value}--glass`]: props.effect === 'glass',
        [`${tabBarClass.value}--safe`]: props.safeAreaInsetBottom,
      },
      `${tabBarClass.value}--${props.shape}`,
    ]);

    const glassDevContext = inject(tabBarGlassDevContextKey, undefined);
    const glassFilterState = useTabBarGlassFilter({
      root,
      enabled: computed(() => props.effect === 'glass'),
      shape: computed(() => props.shape),
      devContext: glassDevContext,
    });

    const styles = computed<CSSProperties>(() => ({
      zIndex: props.zIndex,
    }));

    const { rect: tabBarRect } = useElementRect(root, {
      immediate: props.fixed && props.placeholder,
      resizeObserver: props.fixed && props.placeholder,
    });

    const tabBarHeight = computed(() => tabBarRect.value.height);

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

      const childSlots = useChildSlots('TTabBarItem', vNodes);
      itemCount.value = childSlots.length;
    };

    return () => {
      const vNodes = context.slots.default ? context.slots.default() : [];
      updateItemCount(vNodes);

      const renderTabBar =
        props.effect === 'glass' ? (
          <div ref={root} role="tablist" class={rootClass.value} style={styles.value}>
            {renderTabBarGlassLayers(`${tabBarClass.value}__glass`, glassFilterState.value)}
            {renderTNodeJSX('default')}
          </div>
        ) : (
          <div ref={root} role="tablist" class={rootClass.value} style={styles.value}>
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
