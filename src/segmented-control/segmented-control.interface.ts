import { PropType } from 'vue';

export type ItemType = { value?: string | number, text: string }
export type ItemsProps = PropType<ItemType[]>;

export type ModelValueProps = PropType<number | string>;
export interface SegmentedControlProps {
  modelValue?: ModelValueProps;
  items: ItemsProps;
}
