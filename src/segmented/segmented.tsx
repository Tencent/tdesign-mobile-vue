import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, ref, toRefs, watch } from 'vue';
import { isFunction } from 'lodash-es';
import config from '../config';
import props from './props';
import useVModel from '../hooks/useVModel';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-segmented`,
  props,
  emits: ['update:value', 'update:modelValue', 'change'],
  setup(props, context) {
    const segmentedClass = usePrefixClass('segmented');

    const { value, modelValue } = toRefs(props);
    const [innerValue, setInnerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);

    const thumbStyle = ref<Record<string, string>>({});
    const groupRef = ref<HTMLDivElement>();
    const itemRefs = ref<(HTMLDivElement | null)[]>([]);

    const segmentItems = computed(() => {
      if (!props.options?.length) return [];
      return props.options.map((option) => {
        if (typeof option === 'string' || typeof option === 'number') {
          return {
            value: option,
            label: String(option),
          };
        }
        return {
          ...option,
          label: option.label ?? String(option.value),
        };
      });
    });

    const activeIndex = computed(() => {
      if (innerValue.value == null) return -1;
      return segmentItems.value.findIndex((item) => item.value === innerValue.value);
    });

    const updateThumb = () => {
      if (activeIndex.value < 0) {
        thumbStyle.value = {};
        return;
      }

      nextTick(() => {
        const groupEl = groupRef.value;
        const itemEl = itemRefs.value[activeIndex.value];
        if (!groupEl || !itemEl) return;

        const groupRect = groupEl.getBoundingClientRect();
        const itemRect = itemEl.getBoundingClientRect();

        thumbStyle.value = {
          width: `${itemRect.width}px`,
          transform: `translateX(${itemRect.left - groupRect.left}px)`,
        };
      });
    };

    const handleSelect = (index: number) => {
      const item = segmentItems.value[index];
      if (props.disabled || !item || item.disabled) return;
      if (index === activeIndex.value) return;

      setInnerValue(item.value, item);
    };

    watch(activeIndex, () => {
      updateThumb();
    });

    watch(
      () => props.options,
      () => {
        nextTick(() => {
          updateThumb();
        });
      },
      { deep: true },
    );

    onMounted(() => {
      updateThumb();

      if (typeof ResizeObserver !== 'undefined' && groupRef.value) {
        const ro = new ResizeObserver(() => updateThumb());
        ro.observe(groupRef.value);
        onUnmounted(() => ro.disconnect());
      }
    });

    return () => {
      const rootClasses = [
        segmentedClass.value,
        {
          [`${segmentedClass.value}--block`]: props.block,
        },
      ];

      return (
        <div class={rootClasses}>
          <div class={`${segmentedClass.value}__group`} ref={groupRef}>
            {/* 滑块背景 */}
            <div class={`${segmentedClass.value}__thumb`} style={thumbStyle.value} />

            {/* 选项列表 */}
            {segmentItems.value.map((item, index) => {
              const itemClasses = [
                `${segmentedClass.value}__item`,
                `${segmentedClass.value}-item-${index}`,
                {
                  [`${segmentedClass.value}__item--active`]: index === activeIndex.value,
                  [`${segmentedClass.value}__item--disabled`]: props.disabled || item.disabled,
                },
              ];

              // 渲染 icon
              const iconNode = item.icon && (
                <span class={`${segmentedClass.value}__item-icon`}>
                  {isFunction(item.icon) ? item.icon(h) : item.icon}
                </span>
              );

              // 渲染 label
              const labelNode = item.label && (
                <span class={`${segmentedClass.value}__item-label`}>
                  {isFunction(item.label) ? item.label(h) : item.label}
                </span>
              );

              return (
                <div
                  key={item.value}
                  ref={(el) => {
                    itemRefs.value[index] = el as HTMLDivElement;
                  }}
                  class={itemClasses}
                  onClick={() => handleSelect(index)}
                >
                  <div class={`${segmentedClass.value}__item-inner`}>
                    {iconNode}
                    {labelNode}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
  },
});
