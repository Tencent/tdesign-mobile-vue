<template>
  <div :class="`${name}`">
    <div :class="`${name}__toolbar`">
      <t-button :class="`${name}__cancel`" variant="text" @click="handleCancel">{{ cancelButtonText }}</t-button>
      <div :class="`${name}__title`">{{ title }}</div>
      <t-button :class="`${name}__confirm`" variant="text" @click="handleConfirm">{{ confirmButtonText }}</t-button>
    </div>
    <div :class="`${name}__main`">
      <div :class="`${name}-item__group`">
        <picker-item
          v-for="(item, index) in realColumns"
          :key="index"
          :options="item"
          :default-value="pickerValue[index]"
          :render-label="renderLabel"
          @pick="handlePick($event, index)"
        />
      </div>
      <div :class="`${name}__mask`"></div>
      <div :class="`${name}__indicator`"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, nextTick, defineComponent, SetupContext, toRefs, onMounted, ref } from 'vue';
import config from '../config';
import PickerProps from './props';
import { PickerValue, PickerColumn, PickerColumnItem } from './type';
import TButton from '../button';
import { useEmitEvent, useVModel, useChildSlots, TNode } from '../shared';
import PickerItem from './picker-item.vue';

const { prefix } = config;
const name = `${prefix}-picker`;
// 通过value和columns，生成对应的indexArray
const getIndexFormColumns = (columns: PickerColumn[], value: PickerValue, column: number) => {
  let resultIndex;
  columns[column]?.forEach((item: PickerColumnItem, index: number) => {
    if (item.value === value) {
      resultIndex = index;
    }
  });
  return resultIndex;
};
export default defineComponent({
  name,
  components: { TButton, PickerItem },
  props: PickerProps,
  emits: ['change', 'cancel', 'pick', 'update:modelValue'],
  setup(props: any, context: SetupContext) {
    const emitEvent = useEmitEvent(props, context.emit);
    const { value, modelValue } = toRefs(props);
    const [pickerValue, setPickerValue] = useVModel(value, modelValue, props.defaultValue, props.onChange);
    const confirmButtonText = computed(() => props.confirmBtn || '确定');
    const cancelButtonText = computed(() => props.cancelBtn || '取消');
    const realColumns = computed(() => {
      if (typeof props.columns === 'function') {
        const data = props.columns(curValueArray.value);
        return data;
      }
      return props.columns;
    });
    const curValueArray = ref(pickerValue.value.map((item: PickerValue) => item));
    let lastTimeValueArray = [...curValueArray.value];
    let curIndexArray = pickerValue.value.map((item: PickerValue, index: number) => {
      return getIndexFormColumns(realColumns.value, item, index);
    });
    let lastTimeIndexArray = [...curIndexArray];
    const pickerItemInstanceArray = <any>ref([]);
    onMounted(() => {
      // 获取pickerItem实例，用于更新每个item的value和index
      pickerItemInstanceArray.value = useChildSlots('t-picker-item').map((item) => item.component);
    });
    const handleConfirm = (e: MouseEvent) => {
      // 点击确认后，更新最近一次的picker状态
      lastTimeValueArray = [...curValueArray.value];
      lastTimeIndexArray = [...curIndexArray];
      setPickerValue(curValueArray.value, { index: curIndexArray });
      emitEvent('confirm', curValueArray.value, { index: curIndexArray });
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
            }
          });
        }
        emitEvent('pick', curValueArray.value, { index: context.index, column });
      }
    };

    return {
      name,
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
