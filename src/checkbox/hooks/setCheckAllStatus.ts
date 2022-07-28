// 计算全选按钮的状态
import { computed, ref, ComputedRef, Ref } from 'vue';
import intersection from 'lodash/intersection';

export const setCheckAllStatus = (optionList: Ref<any[]>, innerValue: Ref, checkedSet: ComputedRef) => {
  const { isArray } = Array;
  const intersectionLen = computed(() => {
    const values = optionList.value?.map((item) => item.value);
    if (isArray(innerValue.value)) {
      return intersection(innerValue.value, values).length;
    }
    return 0;
  });

  const isAllChecked = computed(() => {
    if (checkedSet.value.size !== optionList.value.length - 1) {
      return false;
    }
    return intersectionLen.value === optionList.value.length - 1;
  });

  const indeterminate = computed(() => {
    return !isAllChecked.value && intersectionLen.value < optionList.value.length && intersectionLen.value > 0;
  });

  return computed(() => {
    if (isAllChecked.value) return 'checked';
    if (indeterminate.value) return 'indeterminate';
    return 'uncheck';
  });
};
