import { ref, computed, onMounted, onBeforeUnmount, defineComponent, PropType, watch, inject } from 'vue';
import { get as lodashGet } from 'lodash-es';
import config from '../config';
import Picker from './picker.class';
import { KeysType } from '../common';
import { PickerColumnItem, PickerValue, PickerWheelConfig, TdPickerProps } from './type';
import { usePrefixClass } from '../hooks/useClass';
import { DEFAULT_WHEEL_CONFIG } from './constants';

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
    wheelConfig: {
      type: Object as PropType<Required<PickerWheelConfig>>,
      default: () => DEFAULT_WHEEL_CONFIG,
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

    const updatePickerIndex = (index: number) => {
      if (picker) {
        picker.updateItems();
        picker.updateIndex(index, { isChange: false });
      }
    };

    const setIndex = (index: number) => {
      updatePickerIndex(index);
    };

    const setValue = (value: number | string | undefined) => {
      const index = getIndexByValue(value);
      updatePickerIndex(index);
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
          wheelConfig: props.wheelConfig,
        });
      }
    });

    onBeforeUnmount(() => {
      // 销毁 picker 实例，清理 ResizeObserver 等资源
      picker?.destroy();
      picker = null;
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
