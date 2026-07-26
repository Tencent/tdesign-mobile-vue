import { defineComponent, ref, provide, inject, Ref, computed, toRefs, VNode, CSSProperties } from 'vue';
import TabBarProps from './props';
import useChildSlots from '../hooks/useChildSlots';
import useVModel from '../hooks/useVModel';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useClass';
import useElementRect from '../hooks/useElementRect';
import { tabBarGlassDevContextKey, useTabBarGlassFilter } from './useTabBarGlassFilter';

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
        return [];
      }

      const childSlots = useChildSlots('TTabBarItem', vNodes);
      itemCount.value = childSlots.length;
      return childSlots;
    };

    const renderSelectionIndicator = (items: VNode[]) => {
      if (props.effect !== 'glass' || props.shape !== 'round' || !items.length) return null;

      const selectedValue = Array.isArray(activeValue.value) ? activeValue.value[0] : activeValue.value;
      const selectedIndex = items.findIndex((item, index) => {
        const itemValue = typeof item.props?.value === 'undefined' ? index : item.props.value;
        return itemValue === selectedValue;
      });
      if (selectedIndex < 0) return null;

      const indicatorStyle: CSSProperties = {
        width: `${100 / items.length}%`,
        transform: `translate3d(${selectedIndex * 100}%, 0, 0)`,
      };

      return (
        <span class={`${tabBarClass.value}__selection-track`} aria-hidden="true">
          <span class={`${tabBarClass.value}__selection-indicator`} style={indicatorStyle} />
        </span>
      );
    };

    const renderGlassLayers = () => {
      if (props.effect !== 'glass') return [];

      const filter = glassFilterState.value;
      const filterStyle = filter
        ? ({ '--td-tab-bar-glass-filter': `url("#${filter.filterId}")` } as CSSProperties)
        : undefined;

      return [
        <span class={`${tabBarClass.value}__glass-refraction`} style={filterStyle} aria-hidden="true" />,
        <span class={`${tabBarClass.value}__glass-base`} aria-hidden="true" />,
        <span class={`${tabBarClass.value}__glass-sheen`} aria-hidden="true" />,
        filter ? (
          <svg
            class={`${tabBarClass.value}__glass-filter`}
            width="0"
            height="0"
            aria-hidden="true"
            focusable="false"
            style={{ position: 'absolute' }}
          >
            <defs>
              <filter
                id={filter.filterId}
                x={-filter.displacementScale}
                y={-filter.displacementScale}
                width={filter.width + filter.displacementScale * 2}
                height={filter.height + filter.displacementScale * 2}
                filterUnits="userSpaceOnUse"
                primitiveUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation={filter.blur} result="blurred-source" />
                <feImage
                  href={filter.displacementUrl}
                  result="displacement-map"
                  x="0"
                  y="0"
                  width={filter.width}
                  height={filter.height}
                  preserveAspectRatio="none"
                />
                <feDisplacementMap
                  in="blurred-source"
                  in2="displacement-map"
                  scale={filter.displacementScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                  result="refracted"
                />
                <feColorMatrix
                  in="refracted"
                  type="saturate"
                  values={String(filter.specularSaturation)}
                  result="refracted-saturated"
                />
                <feImage
                  href={filter.specularUrl}
                  result="specular-map"
                  x="0"
                  y="0"
                  width={filter.width}
                  height={filter.height}
                  preserveAspectRatio="none"
                />
                <feComposite in="refracted-saturated" in2="specular-map" operator="in" result="masked-specular" />
                <feComponentTransfer in="specular-map" result="faded-specular">
                  <feFuncA type="linear" slope={filter.specularOpacity} />
                </feComponentTransfer>
                <feBlend in="masked-specular" in2="refracted" mode="normal" result="refracted-highlight" />
                <feBlend in="faded-specular" in2="refracted-highlight" mode="screen" />
              </filter>
            </defs>
          </svg>
        ) : null,
      ];
    };

    return () => {
      const vNodes = context.slots.default ? context.slots.default() : [];
      const items = updateItemCount(vNodes);

      const renderTabBar =
        props.effect === 'glass' ? (
          <div ref={root} role="tablist" class={rootClass.value} style={styles.value}>
            {renderGlassLayers()}
            {renderSelectionIndicator(items)}
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
