import isArray from 'lodash/isArray';
import { PickerColumn } from './type';

export const isMultipleArray = (arr: PickerColumn | PickerColumn[]) => {
  return isArray(arr[0]);
};

export const getPickerColumns = (columns: any): PickerColumn[] => {
  return isMultipleArray(columns) ? columns : [columns];
};
