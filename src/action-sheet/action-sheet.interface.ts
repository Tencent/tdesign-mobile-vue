export type ActionSheetType = 'list' | 'grid';

export type ItemType = {
  label: string;
  color?: string;
  disabled?: boolean;
};

export interface ActionSheetProps {
  modelValue: boolean;
  visible: boolean;
  count: number;
  items: Array<ItemType | string>;
  type: ActionSheetType;
  showCancel: boolean;
  cancelText: string;
}
