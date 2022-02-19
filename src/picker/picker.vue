<template>
  <div :class="className">
    <div :class="toolbarClassName">
      <button :class="cancelClassName" @click="handleCancel">{{ cancelButtonText }}</button>
      <div :class="titleClassName">{{ title }}</div>
      <button :class="confirmClassName" @click="handleConfirm">{{ confirmButtonText }}</button>
    </div>
    <div :class="mainClassName">
      <div :class="groupClassName">
        <component :is="pickerItems" />
      </div>
      <div :class="maskClassName"></div>
      <div :class="indicatorClassName"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, mergeProps, defineComponent, SetupContext } from 'vue';
import { useDefault } from '../shared';
import config from '../config';
import { PickerProps } from './props';
import { PickerValue } from './type';

const { prefix } = config;
const name = `${prefix}-picker`;

export default defineComponent({
  name,
  props: PickerProps,
  emits: ['change', 'cancel', 'confirm', 'update:modelValue'],
  setup(props, context: SetupContext) {
    const className = computed(() => [`${name}`]);
    const groupClassName = computed(() => `${name}-item__group`);
    const maskClassName = computed(() => `${name}__mask`);
    const indicatorClassName = computed(() => `${name}__indicator`);
    const mainClassName = computed(() => `${name}__main`);
    const toolbarClassName = computed(() => `${name}__toolbar`);
    const titleClassName = computed(() => `${name}__title`);
    const cancelClassName = computed(() => `${name}__cancel`);
    const confirmClassName = computed(() => `${name}__confirm`);
    const confirmButtonText = computed(() => props.confirmBtn || '确定');
    const cancelButtonText = computed(() => props.cancelBtn || '取消');
    const curData: Array<PickerValue> = [];

    const pickerItems = () => {
      let pickerItems = context.slots.default ? context.slots.default() : [];
      pickerItems = pickerItems.map((pickerItem: any, itemIndex: number) => {
        const newPickerItem = pickerItem;
        const pickerItemDefaultValue = Array.isArray(props.defaultValue)
          ? props.defaultValue[itemIndex]
          : newPickerItem.props.value || newPickerItem.props.options[0];
        const curValue = pickerItemDefaultValue;
        if (!curData[itemIndex]) {
          curData[itemIndex] = curValue;
        }

        newPickerItem.props = mergeProps(newPickerItem.props, {
          value: curValue,
          onChange(e: any) {
            curData[itemIndex] = e.value;
            const changeData = [...curData];
            context.emit('change', changeData);
          },
        });
        return newPickerItem;
      });
      return pickerItems;
    };

    const handleConfirm = (e: MouseEvent) => {
      const emitData = curData.reduce((acc, item) => {
        acc.push(item);
        return acc;
      }, [] as Array<PickerValue>);
      context.emit('update:modelValue', emitData);
      context.emit('confirm', { e });
    };

    const handleCancel = (e: MouseEvent) => context.emit('cancel', { e });

    return {
      className,
      mainClassName,
      groupClassName,
      maskClassName,
      toolbarClassName,
      cancelClassName,
      confirmClassName,
      titleClassName,
      confirmButtonText,
      cancelButtonText,
      indicatorClassName,
      handleConfirm,
      handleCancel,
      pickerItems,
      curData,
    };
  },
});
</script>
