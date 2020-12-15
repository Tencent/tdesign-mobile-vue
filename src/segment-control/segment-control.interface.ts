import { PropType } from 'vue';

export type ItemsProps = PropType<Array<string | number>>;

export type ModelValueProps = PropType<Array<string | number> | number | string>;

export interface SegmentControlProps {
  modelValue?: ModelValueProps
  items: ItemsProps
  isMultiple?: boolean
}
