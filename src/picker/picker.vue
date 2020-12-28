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
import { computed, SetupContext, mergeProps, defineComponent } from 'vue';
import config from '../config';
import { PickerProps, PickerPropsType } from './picker.interface';

const { prefix } = config;
const name = `${prefix}-picker`;

export default defineComponent({
  props: PickerProps,
  emits: ['change', 'cancel', 'confirm'],
  setup(props: PickerPropsType, context: SetupContext) {
    const className = computed(() => [`${name}`, `${name}--theme-${props.theme}`]);
    const groupClassName = computed(() => `${name}-column__group`);
    const maskClassName = computed(() => `${name}__mask`);
    const indicatorClassName = computed(() => `${name}__indicator`);
    const mainClassName = computed(() => `${name}__main`);
    const toolbarClassName = computed(() => `${name}__toolbar`);
    const titleClassName = computed(() => `${name}__title`);
    const cancelClassName = computed(() => `${name}__cancel`);
    const confirmClassName = computed(() => `${name}__confirm`);
    const confirmButtonText = computed(() => props.confirmButtonText || '确定');
    const cancelButtonText = computed(() => props.cancelButtonText || '取消');

    const curData: any[] = [];
    let columnLen = 0;

    const pickerColumns = () => {
      let pickerColumnItems = context.slots.default ? context.slots.default() : [];
      columnLen = pickerColumnItems.length;
      pickerColumnItems = pickerColumnItems.map((pickerColumn: any, columnIndex: number) => {
        const newPickerColumn = pickerColumn;
        const curIndex = newPickerColumn.props['default-index'] || newPickerColumn.props.defaultIndex || 0;
        if (!curData[columnIndex]) {
          curData[columnIndex] = {
            value: newPickerColumn.props.options[curIndex],
            index: curIndex,
          };
        }
        newPickerColumn.props = mergeProps(newPickerColumn.props, {
          onChange(e: any) {
            const newEvent = Object.assign({ column: columnIndex }, e);
            curData[columnIndex] = {
              value: e.value,
              index: e.index,
            };
            context.emit('change', newEvent);
          },
        });
        return newPickerColumn;
      });
      return pickerColumnItems;
    };

    const handleConfirm = () => {
      let emitData = columnLen > 1 ? curData : curData[0];
      if (Array.isArray(emitData)) {
        emitData = emitData.reduce(
          (acc, item) => {
            acc.value.push(item.value);
            acc.index.push(item.index);
            return acc;
          },
          { value: [], index: [] },
        );
      }
      context.emit('confirm', emitData);
    };

    const handleCancel = () => context.emit('cancel');

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
