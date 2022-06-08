import { CollapseValue } from './type';

export type onChangeEvent = (value: any) => void;

export interface CollapseStateType {
  /**
   * @description 折叠面板 class类
   */
  className: string;
  /**
   * @description 展开的面板状态
   */
  curValue?: CollapseValue;
}
