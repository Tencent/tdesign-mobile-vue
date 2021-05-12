
export type ActionSheetType = 'list' | 'grid';

export type ItemType = {
  label: string,
  color?: string
  disabled?: boolean
};

export interface PopupProps {
  modelValue: boolean;
  visible: boolean;
  count: number;
  items: Array<ItemType | string>;
  type: ActionSheetType;
  showCancel: boolean;
  cancelText: string;
}
