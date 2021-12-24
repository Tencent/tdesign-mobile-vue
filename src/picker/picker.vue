<template>
  <div :class="className">
    <div :class="toolbarClassName">
      <button :class="cancelClassName" @click="handleCancel">{{ cancelButtonText }}</button>
      <div :class="titleClassName">{{ title }}</div>
      <button :class="confirmClassName" @click="handleConfirm">{{ confirmButtonText }}</button>
    </div>
    <div :class="mainClassName">
      <div :class="groupClassName">
        <component :is="pickerColumns" />
      </div>
      <div :class="maskClassName"></div>
      <div :class="indicatorClassName"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, mergeProps, defineComponent } from 'vue';
import config from '../config';
import { PickerProps } from './props';
import { PickerValue } from './type';

const { prefix } = config;
const name = `${prefix}-picker`;

export default defineComponent({
  name,
  props: PickerProps,
  emits: ['change', 'cancel', 'confirm', 'update:modelValue'],
  setup(props, context) {
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

    const pickerColumns = () => {
      let pickerColumnItems = context.slots.default ? context.slots.default() : [];
      pickerColumnItems = pickerColumnItems.map((pickerColumn: any, columnIndex: number) => {
        const newPickerColumn = pickerColumn;
        const curIndex = newPickerColumn.props['default-index'] || newPickerColumn.props.defaultIndex || 0;
        if (!curData[columnIndex]) {
          curData[columnIndex] = newPickerColumn.props.options[curIndex];
        }
        newPickerColumn.props = mergeProps(newPickerColumn.props, {
          onChange(e: any) {
            curData[columnIndex] = e.value;
            const changeData = [...curData];
            context.emit('change', changeData);
          },
        });
        return newPickerColumn;
      });
      return pickerColumnItems;
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
      pickerColumns,
      curData,
    };
  },
});
</script>
