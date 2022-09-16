<template>
  <div ref="root" :class="className">
    <ul :class="wrapperClassName">
      <li v-for="(option, index) in options" :key="index" :class="itemClassName">
        {{ renderLabel ? renderLabel(option) : option.label }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, toRefs, defineComponent, PropType, SetupContext } from 'vue';
import config from '../config';
import Picker from './picker.class';
import { PickerColumnItem, PickerValue } from './type';
import { useEmitEvent } from '../shared';

const { prefix } = config;
const name = `${prefix}-picker-item`;
export default defineComponent({
  name,
  props: {
    options: {
      type: Array as PropType<PickerColumnItem[]>,
      default: () => [],
    },
    defaultValue: {
      type: [String, Number] as PropType<PickerValue>,
      default: undefined,
    },
    renderLabel: {
      type: Function,
      default: undefined,
    },
  },
  emits: ['pick'],
  setup(props: any, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    let picker: Picker | null = null;
    const el = document.createElement('div');
    const root = ref(el);
    const getIndexByValue = (val: number | string | undefined) => {
      let defaultIndex = 0;
      if (val !== undefined) {
        defaultIndex = props.options.findIndex((item: any) => item.value === val);
      }
      return defaultIndex < 0 ? 0 : defaultIndex;
    };

    const className = computed(() => `${name}`);
    const wrapperClassName = computed(() => [`${name}__wrapper`]);
    const itemClassName = computed(() => [`${name}__item`]);
    const setIndex = (index: number) => {
      if (picker) {
        picker.updateItems();
        picker.updateIndex(index, {
          isChange: false,
        });
      }
    };
    const setValue = (value: number | string | undefined) => {
      if (picker) {
        picker.updateItems();
        picker.updateIndex(getIndexByValue(value), {
          isChange: false,
        });
      }
    };
    const setOptions = () => {
      picker && picker.update();
    };
    const setUpdateItems = () => {
      picker && picker.updateItems();
    };
    context.expose({
      setIndex,
      setValue,
      setOptions,
      setUpdateItems,
    });

    onMounted(() => {
      picker = new Picker({
        el: root.value,
        defaultIndex: getIndexByValue(props.defaultValue) || 0,
        onChange: (index: number) => {
          const curItem = props.options[index];
          const changeValue = { value: curItem.value, index };
          emitEvent('pick', changeValue);
        },
      });
    });

    return {
      root,
      className,
      wrapperClassName,
      itemClassName,
      ...toRefs(props),
    };
  },
});
</script>
