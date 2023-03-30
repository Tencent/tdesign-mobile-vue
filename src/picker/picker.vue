<template>
  <div :class="`${name}`">
    <div :class="`${name}__toolbar`">
      <div v-if="cancelButtonText" :class="`${name}__cancel`" @click="handleCancel">{{ cancelButtonText }}</div>
      <div :class="`${name}__title`">{{ title }}</div>
      <div v-if="confirmButtonText" :class="`${name}__confirm`" @click="handleConfirm">{{ confirmButtonText }}</div>
    </div>
    <t-node :content="header" />
    <div :class="`${name}__main`">
      <div v-for="(item, index) in realColumns" :key="index" :class="`${name}-item__group`">
        <picker-item
          :options="item"
          :default-value="pickerValue[index]"
          :render-label="renderLabel"
          @pick="handlePick($event, index)"
        />
      </div>
      <div :class="`${name}__mask ${name}__mask--top`" />
      <div :class="`${name}__mask ${name}__mask--bottom`" />
      <div :class="`${name}__indicator`" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, nextTick, defineComponent, toRefs, onMounted, ref, getCurrentInstance } from 'vue';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';

import config from '../config';
import PickerProps from './props';
import { PickerValue, PickerColumn, PickerColumnItem } from './type';
import { useEmitEvent, useVModel, useChildSlots, useExpose, TNode, renderTNode } from '../shared';
import PickerItem from './picker-item.vue';

const { prefix } = config;
const name = `${prefix}-picker`;
// 通过value和columns，生成对应的indexArray
const getIndexFromColumns = (column: PickerColumn, value: PickerValue) => {
  if (!value) return 0;
  return column?.findIndex((item: PickerColumnItem) => item.value === value);
};
export default defineComponent({
  name,
  components: { PickerItem, TNode },
  props: PickerProps,
  emits: ['change', 'cancel', 'pick', 'update:modelValue', 'update:value'],
  setup(props: any, context) {
    const internalInstance = getCurrentInstance();
    const emitEvent = useEmitEvent(props, context.emit);
    const { value, modelValue } = toRefs(props);
    const [pickerValue, setPickerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const getDefaultText = (prop: string | boolean, defaultText: string): string => {
      if (isString(prop)) return prop;
      if (isBoolean(prop) && prop) return defaultText;
      return '';
    };
    const confirmButtonText = computed(() => getDefaultText(props.confirmBtn, '确认'));
    const cancelButtonText = computed(() => getDefaultText(props.cancelBtn, '取消'));
    const header = computed(() => renderTNode(internalInstance, 'header'));
    const curValueArray = ref(pickerValue.value.map((item: PickerValue) => item));
    const realColumns = computed(() => {
      if (typeof props.columns === 'function') {
        const data = props.columns(curValueArray.value);
        return data;
      }
      return props.columns;
    });
    let lastTimeValueArray = [...curValueArray.value];
    let curIndexArray = realColumns.value.map((item: PickerColumn, index: number) => {
      return getIndexFromColumns(item, pickerValue?.value[index]);
    });
    let lastTimeIndexArray = [...curIndexArray];
    const pickerItemInstanceArray = ref([]) as any;
    onMounted(() => {
      // 获取pickerItem实例，用于更新每个item的value和index
      pickerItemInstanceArray.value = useChildSlots('t-picker-item').map((item) => item.component);
    });
    const handleConfirm = (e: MouseEvent) => {
      // 点击确认后，更新最近一次的picker状态
      lastTimeValueArray = [...curValueArray.value];
      lastTimeIndexArray = [...curIndexArray];
      setPickerValue(curValueArray.value);
      const label = realColumns.value.map((item: PickerColumnItem, index: number) => item[curIndexArray[index]].label);
      emitEvent('confirm', curValueArray.value, { index: curIndexArray, label, e });
    };
    const handleCancel = (e: MouseEvent) => {
      // 点击取消后，重置最近一次的picker状态
      curValueArray.value = [...lastTimeValueArray];
      curIndexArray = [...lastTimeIndexArray];
      pickerItemInstanceArray.value.forEach((item: any, index: number) => {
        item.exposed?.setIndex(curIndexArray[index]);
      });
      emitEvent('cancel', { e });
    };
    const handlePick = (context: any, column: number) => {
      if (curValueArray.value[column] !== context.value) {
        curValueArray.value[column] = context.value;
        curIndexArray[column] = context.index;
        // 当使用cascade或者dateTimePicker时，需要更新子节点的value和index
        if (typeof props.columns === 'function') {
          const result = props.columns(curValueArray.value);
          result.forEach((item: PickerColumnItem[], index: number) => {
            if (!item.filter((ele: PickerColumnItem) => ele.value === curValueArray.value[index]).length) {
              curValueArray.value[index] = item[0]?.value;
              curIndexArray[index] = 0;
              nextTick(() => {
                pickerItemInstanceArray.value[index]?.exposed?.setIndex(0);
              });
            } else {
              nextTick(() => {
                pickerItemInstanceArray.value[index]?.exposed?.setUpdateItems();
              });
            }
          });
        }
        emitEvent('pick', curValueArray.value, { index: context.index, column });
      }
    };

    const setValues = (values: string[]) => {
      curValueArray.value = values;
      setPickerValue(values);
      // 等columns更新完后，再更新value
      nextTick(() => {
        pickerItemInstanceArray.value.forEach((item: any, index: number) => {
          item.exposed?.setValue(values[index]);
        });
      });
    };

    useExpose({
      setValues,
    });

    return {
      name,
      header,
      pickerValue,
      confirmButtonText,
      cancelButtonText,
      handleConfirm,
      handleCancel,
      handlePick,
      realColumns,
    };
  },
});
</script>
