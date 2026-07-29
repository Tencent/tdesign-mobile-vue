import { defineComponent, ref, provide, Ref, computed, toRefs, VNode, CSSProperties } from 'vue';
import TabBarProps from './props';
import useChildSlots from '../hooks/useChildSlots';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import useElementRect from '../hooks/useElementRect';

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
        [`${tabBarClass.value}--safe`]: props.safeAreaInsetBottom,
        [`${tabBarClass.value}--liquid-glass`]: props.shape === 'liquid-glass',
        [`${tabBarClass.value}--round`]: props.shape === 'round' || props.shape === 'liquid-glass',
      },
      props.shape !== 'liquid-glass' ? `${tabBarClass.value}--${props.shape}` : '',
    ]);

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

    const renderLiquidGlassLayers = () => {
      if (props.shape !== 'liquid-glass') return null;
      return (
        <>
          {/* SVG filter for liquid glass displacement effect */}
          <svg class={`${tabBarClass.value}__liquid-glass-svg`} aria-hidden="true">
            <defs>
              <filter
                id={`${tabBarClass.value}-liquid-glass-filter`}
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                filterUnits="objectBoundingBox"
              >
                <feDisplacementMap scale="200" />
              </filter>
            </defs>
          </svg>
          {/* Liquid glass layers */}
          <div class={`${tabBarClass.value}__liquid-glass-outer`}></div>
          <div class={`${tabBarClass.value}__liquid-glass-cover`}></div>
          <div class={`${tabBarClass.value}__liquid-glass-sharp`}></div>
          <div class={`${tabBarClass.value}__liquid-glass-reflect`}></div>
        </>
      );
    };

    return () => {
      const vNodes = context.slots.default ? context.slots.default() : [];
      updateItemCount(vNodes);

      const renderTabBar = (
        <div ref={root} role="tablist" class={rootClass.value} style={styles.value}>
          {renderLiquidGlassLayers()}
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
