<template>
  <div :class="`${name}`">
    <div :class="`${name}__toolbar`">
      <t-button :class="`${name}__cancel`" variant="text" @click="handleCancel">{{ cancelButtonText }}</t-button>
      <div :class="`${name}__title`">{{ title }}</div>
      <t-button :class="`${name}__confirm`" variant="text" @click="handleConfirm">{{ confirmButtonText }}</t-button>
    </div>
    <div :class="`${name}__main`">
      <div :class="`${name}-item__group`">
        <t-node :content="pickerItems" />
      </div>
      <div :class="`${name}__mask`"></div>
      <div :class="`${name}__indicator`"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, mergeProps, defineComponent, SetupContext, toRefs, onMounted, ref, nextTick } from 'vue';
import config from '../config';
import PickerProps from './props';
import { PickerValue } from './type';
import TButton from '../button';
import { useEmitEvent, useVModel, useChildSlots, TNode } from '../shared';

const { prefix } = config;
const name = `${prefix}-picker`;

export default defineComponent({
  name,
  components: { TButton, TNode },
  props: PickerProps,
  emits: ['change', 'cancel', 'pick', 'update:modelValue'],
  setup(props: any, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const { value, modelValue } = toRefs(props);
    const [pickerValue, setPickerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const confirmButtonText = computed(() => props.confirmBtn || '确定');
    const cancelButtonText = computed(() => props.cancelBtn || '取消');
    let curValueArray = <PickerValue[]>[];
    let lastTimeValueArray = <PickerValue[]>[];
    let curIndexArray = <Number[]>[];
    let lastTimeIndexArray = <Number[]>[];

    const pickerItems: any = ref('');

    const initPickerItems = () => {
      // 获取slot的vnode，根据picker组件的value，给每个pickerItem设置默认值，并绑定pick事件
      pickerItems.value = useChildSlots('t-picker-item', context.slots.default ? context.slots.default() : []);
      pickerItems.value = pickerItems.value.map((pickerItem: any, itemIndex: number) => {
        const newPickerItem = pickerItem;
        let pickerItemDefaultValue;
        // value绑定的默认值
        if (Array.isArray(props.value)) {
          pickerItemDefaultValue = props.value[itemIndex];
        }
        // v-model绑定的默认值
        if (Array.isArray(props.modelValue)) {
          pickerItemDefaultValue = props.modelValue[itemIndex];
        }
        // 通过:default-value绑定的默认值
        if (Array.isArray(props.defaultValue)) {
          pickerItemDefaultValue = props.defaultValue[itemIndex];
        }
        newPickerItem.props = mergeProps(newPickerItem.props, {
          ref: `picker-item-${itemIndex}`,
          value: pickerItemDefaultValue,
          onPick(data: any) {
            curValueArray[itemIndex] = data.value;
            curIndexArray[itemIndex] = data.index;
            emitEvent('pick', curValueArray, { index: curIndexArray[itemIndex], column: itemIndex });
          },
        });
        return newPickerItem;
      });
    };

    // 根据picker组件的value，更新每个pickerItem的value
    const updatePickerItems = (newValue: any) => {
      // 重新获取slot的vnode，修改其中的props.value，并绑定pick事件
      pickerItems.value = useChildSlots('t-picker-item', context.slots.default ? context.slots.default() : []);
      pickerItems.value = [
        ...pickerItems.value.map((pickerItem: any, itemIndex: number) => {
          const newPickerItem = pickerItem;
          newPickerItem.props = mergeProps(newPickerItem.props, {
            value: newValue[itemIndex],
            onPick(data: any) {
              curValueArray[itemIndex] = data.value;
              curIndexArray[itemIndex] = data.index;
              emitEvent('pick', curValueArray, { index: curIndexArray[itemIndex], column: itemIndex });
            },
          });
          return newPickerItem;
        }),
      ];
    };

    onMounted(() => {
      initPickerItems();
    });

    const handleConfirm = (e: MouseEvent) => {
      lastTimeValueArray = [...curValueArray];
      lastTimeIndexArray = [...curIndexArray];
      const emitData = curValueArray.reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [] as Array<PickerValue>);
      setPickerValue(emitData, { index: curIndexArray, e });
      reRenderPickerItem(emitData);
    };

    const handleCancel = (e: MouseEvent) => {
      curValueArray = [...lastTimeValueArray];
      curIndexArray = [...lastTimeIndexArray];
      const emitData = curValueArray.reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [] as Array<PickerValue>);
      // 使用最近一次的value，重新渲染每个pickerItem
      reRenderPickerItem(emitData);
      context.emit('cancel', { e });
    };

    const reRenderPickerItem = (value: PickerValue[]) => {
      pickerItems.value = [];
      nextTick(() => {
        updatePickerItems(value);
      });
    };

    return {
      name,
      confirmButtonText,
      cancelButtonText,
      handleConfirm,
      handleCancel,
      pickerItems,
    };
  },
});
</script>
