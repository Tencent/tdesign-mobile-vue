import { ref, computed, onMounted, defineComponent, PropType, watch, inject, nextTick } from 'vue';
import { get as lodashGet } from 'lodash-es';
import config from '../config';
import Picker from './picker.class';
import { KeysType } from '../common';
import { PickerColumnItem, PickerValue, TdPickerProps } from './type';
import { usePrefixClass } from '../hooks/useClass';

const { prefix } = config;

export default defineComponent({
  name: `${prefix}-picker-item`,
  props: {
    options: {
      type: Array as PropType<PickerColumnItem[]>,
    },
    value: {
      type: [String, Number] as PropType<PickerValue>,
      default: undefined,
    },
    renderLabel: {
      type: Function,
      default: undefined,
    },
    onPick: {
      type: Function,
      default: undefined,
    },
    swipeDuration: {
      type: [String, Number],
      default: 300,
    },
  },
  emits: ['pick'],
  setup(props, context) {
    const pickerItemClass = usePrefixClass('picker-item');

    const pickerProps: TdPickerProps = inject('picker', undefined);

    const keys = computed(() => pickerProps && (pickerProps.keys?.value as KeysType));

    let picker: Picker | null = null;
    const root = ref();
    const getIndexByValue = (val: number | string | undefined) => {
      let defaultIndex = 0;
      if (val !== undefined) {
        defaultIndex = props.options?.findIndex((item: any) => lodashGet(item, keys.value?.value ?? 'value') === val);
      }
      return defaultIndex < 0 ? 0 : defaultIndex;
    };

    const className = computed(() => `${pickerItemClass.value}`);

    const updatePickerWithNextTick = (index: number) => {
      if (picker) {
        picker.updateItems();
        nextTick(() => {
          picker.updateIndex(index, { isChange: false });
        });
      }
    };

    const setIndex = (index: number) => {
      updatePickerWithNextTick(index);
    };

    const setValue = (value: number | string | undefined) => {
      const index = getIndexByValue(value);
      updatePickerWithNextTick(index);
    };
    const setOptions = () => {
      picker?.update();
    };
    const setUpdateItems = () => {
      picker?.updateItems();
    };
    context.expose({
      setIndex,
      setValue,
      setOptions,
      setUpdateItems,
    });

    onMounted(() => {
      if (root.value) {
        picker = new Picker({
          el: root.value,
          defaultIndex: getIndexByValue(props.value) || 0,
          keys: keys.value,
          defaultPickerColumns: props.options,
          onChange: (index: number) => {
            const curItem = props.options[index];
            const changeValue = { value: lodashGet(curItem, keys.value?.value ?? 'value'), index };
            props.onPick?.(changeValue);
          },
          swipeDuration: props.swipeDuration,
        });
      }
    });

    watch(
      () => props.options,
      () => {
        picker?.updateOptions(props.options);
        picker?.updateItems();
      },
      { flush: 'post', deep: true },
    );
    return () => {
      // 拖拽状态数组，保证每个 li 独立
      const startYArr: number[] = [];
      const isDraggingArr: boolean[] = [];

      const onTouchStart = (e: TouchEvent, idx: number) => {
        startYArr[idx] = e.touches[0].clientY;
        isDraggingArr[idx] = false;
      };
      const onTouchMove = (e: TouchEvent, idx: number) => {
        if (Math.abs(e.touches[0].clientY - startYArr[idx]) > 5) {
          isDraggingArr[idx] = true;
        }
      };
      const onTouchEnd = (idx: number, option: any) => {
        if (isDraggingArr[idx]) return;
        if (!lodashGet(option, keys.value?.disabled ?? 'disabled')) {
          picker?.updateIndex(idx, { isChange: true });
        }
      };

      return (
        <ul ref={root} class={className.value}>
          {(props.options || []).map((option, index) => (
            <li
              key={index}
              class={[
                `${pickerItemClass.value}__item`,
                {
                  [`${pickerItemClass.value}__item--disabled`]: lodashGet(option, keys.value?.disabled ?? 'disabled'),
                },
              ]}
              onTouchstart={(e) => onTouchStart(e, index)}
              onTouchmove={(e) => onTouchMove(e, index)}
              onTouchend={() => onTouchEnd(index, option)}
            >
              {context.slots.option ? (
                context.slots.option(option, index)
              ) : (
                <>
                  {props.renderLabel
                    ? props.renderLabel(option, index)
                    : lodashGet(option, keys.value?.label ?? 'label')}
                </>
              )}
            </li>
          ))}
        </ul>
      );
    };
  },
});
