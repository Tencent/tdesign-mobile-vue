import { isArray, get as lodashGet } from 'lodash-es';
import { PickerColumn } from './type';
import { KeysType } from '../common';

export const isMultipleArray = (arr: PickerColumn | PickerColumn[]) => {
  return isArray(arr[0]);
};

export const getPickerColumns = (columns: any): PickerColumn[] => {
  return isMultipleArray(columns) ? columns : [columns];
};

/**
 * 将num限制在给定的最大值（max）和最小值（min）之间
 */
export const limitNumberInRange = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max);

export function findIndexOfEnabledOption(options: PickerColumn, startIndex: number, keys?: KeysType): number {
  // 确保起始索引在合法范围内
  const limitStartIndex = limitNumberInRange(startIndex, 0, Math.max(options.length - 1, 0));
  const disabledKey = keys?.disabled ?? 'disabled';

  // 检查 limitStartIndex 是否已经是有效选项，若是直接返回
  if (!lodashGet(options[limitStartIndex], disabledKey)) {
    return limitStartIndex;
  }

  // 双向搜索
  for (let i = 0; i <= Math.max(limitStartIndex, options.length - limitStartIndex); i++) {
    // Forward Search
    const forwardIdx = limitStartIndex + i;
    if (forwardIdx < options.length && !lodashGet(options[forwardIdx], disabledKey)) {
      return forwardIdx;
    }

    // Backward Search
    const backwardIdx = limitStartIndex - i;
    if (backwardIdx >= 0 && !lodashGet(options[backwardIdx], disabledKey)) {
      return backwardIdx;
    }
  }
  return 0;
}
