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
          :ref="(item) => setPickerItemRef(item, index)"
          :options="item"
          :value="pickerValue?.[index]"
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
import { computed, defineComponent, toRefs, ref, getCurrentInstance, watch } from 'vue';
import isString from 'lodash/isString';
import isBoolean from 'lodash/isBoolean';

import config from '../config';
import PickerProps from './props';
import { PickerValue, PickerColumn, PickerColumnItem } from './type';
import { useVModel, TNode, renderTNode } from '../shared';
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
  setup(props: any) {
    const internalInstance = getCurrentInstance();
    const { value, modelValue } = toRefs(props);
    const [pickerValue = ref([]), setPickerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const getDefaultText = (prop: string | boolean, defaultText: string): string => {
      if (isString(prop)) return prop;
      if (isBoolean(prop) && prop) return defaultText;
      return '';
    };
    const confirmButtonText = computed(() => getDefaultText(props.confirmBtn, '确认'));
    const cancelButtonText = computed(() => getDefaultText(props.cancelBtn, '取消'));
    const header = computed(() => renderTNode(internalInstance, 'header'));
    const curValueArray = ref(pickerValue.value?.map((item: PickerValue) => item) || []);
    const realColumns = computed(() => {
      if (typeof props.columns === 'function') {
        return props.columns(curValueArray.value);
      }
      return props.columns;
    });
    const curIndexArray = realColumns.value.map((item: PickerColumn, index: number) => {
      return getIndexFromColumns(item, pickerValue.value?.[index]);
    });
    const pickerItemInstanceArray = ref<any[]>([]);
    // 获取pickerItem实例，用于更新每个item的value和index
    const setPickerItemRef = (item: any, index: number) => {
      pickerItemInstanceArray.value[index] = item;
    };

    const handleConfirm = (e: MouseEvent) => {
      const target = realColumns.value.map((item: PickerColumnItem, index: number) => item[curIndexArray[index]]);
      const label = target.map((item: PickerColumnItem) => item.label);
      const value = target.map((item: PickerColumnItem) => item.value);
      setPickerValue(value);
      props.onConfirm?.(value, { index: curIndexArray, label, e });
    };
    const handleCancel = (e: MouseEvent) => {
      pickerItemInstanceArray.value.forEach((item: any, index: number) => {
        item?.setIndex(curIndexArray[index]);
      });
      props.onCancel?.({ e });
    };
    const handlePick = (context: any, column: number) => {
      const { index } = context;

      curIndexArray[column] = index;
      curValueArray.value[column] = realColumns.value?.[column][index]?.value;

      props.onPick?.(curValueArray.value, { index, column });
    };

    watch(pickerValue, () => {
      curValueArray.value = pickerValue.value.map((item: PickerValue) => item);
    });

    watch([realColumns, curValueArray], () => {
      realColumns.value.forEach((col: PickerColumn, idx: number) => {
        const index = col.findIndex((item: PickerColumnItem) => item.value === curValueArray.value[idx]);
        curIndexArray[idx] = index > -1 ? index : 0;
        pickerItemInstanceArray.value[idx]?.setIndex(curIndexArray[idx]);
      });
    });

    return {
      name,
      header,
      pickerValue,
      curIndexArray,
      confirmButtonText,
      cancelButtonText,
      handleConfirm,
      handleCancel,
      handlePick,
      realColumns,
      setPickerItemRef,
    };
  },
});
</script>
