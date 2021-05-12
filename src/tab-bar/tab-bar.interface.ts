import { PropType } from 'vue';

export type ModelValueProps = PropType<Array<string | number> | number | string>;

export interface TabBarProps {
  modelValue?: ModelValueProps;
}

export interface TabBarItemSpreadProps {
  name: number | string;
  text: string;
}
