// 计算全选按钮的状态
import { computed, ref, ComputedRef, Ref } from 'vue';
import { intersection } from 'lodash-es';

export const setCheckAllStatus = (optionList: Ref<any[]>, innerValue: Ref, checkedSet: ComputedRef) => {
  const { isArray } = Array;

  // 当前有效选项的 value 列表（排除 checkAll 项和 value 为 undefined 的项）
  const validValues = computed(() => {
    return (
      optionList.value?.filter((item) => !item.checkAll && item.value !== undefined).map((item) => item.value) ?? []
    );
  });

  // innerValue 与当前有效选项的交集长度
  const intersectionLen = computed(() => {
    if (isArray(innerValue.value)) {
      return intersection(innerValue.value, validValues.value).length;
    }
    return 0;
  });

  const isAllChecked = computed(() => {
    const validLen = validValues.value.length;
    if (validLen === 0) return false;
    // 使用交集长度判断是否全选，而非 checkedSet.size，
    // 因为 checkedSet 可能包含不在当前 optionList 中的旧值
    return intersectionLen.value === validLen;
  });

  const indeterminate = computed(() => {
    const validLen = validValues.value.length;
    if (validLen === 0) return false;
    return !isAllChecked.value && intersectionLen.value > 0;
  });

  return computed(() => {
    if (isAllChecked.value) return 'checked';
    if (indeterminate.value) return 'indeterminate';
    return 'uncheck';
  });
};
