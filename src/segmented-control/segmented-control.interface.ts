import { PropType } from 'vue';

export type ItemsProps = PropType<Array<string | number>>;

export type ModelValueProps = PropType<number | string>;
export interface SegmentedControlProps {
  modelValue?: ModelValueProps;
  items: ItemsProps;
}
