
export type ActionSheetType = 'list' | 'grid';

export type Items = {
  label: string,
  color?: string
}

export interface PopupProps {
  modelValue: boolean;
  visible:boolean;
  count: number;
  items: Array<Items | string>;
  type: ActionSheetType;
  showCancel: boolean;
  cancelText: string;
}
