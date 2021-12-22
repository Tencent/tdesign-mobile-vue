/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-12 01:00:48
 * */

export interface TdSwitchProps {
  /**
   * 自定义颜色，[打开时的颜色，关闭时的颜色]。组件默认颜色为 ['#0052d9', 'rgba(0, 0, 0, .26']。示例：[blue, gray]
   */
  colors: string[];
  /**
   * 开关内容，[打开时的值，关闭时的值]。默认为 [true, false]。示例：[1, 0]
   */
  customValue: Array<SwitchValue>;
  /**
   * 是否禁用组件
   * @default false
   */
  disabled: boolean;
  /**
   * 开关的标签
   * @default ''
   */
  label: string;
  /**
   * 开关值
   * @default false
   */
  value: SwitchValue;
  /**
   * 开关值，非受控属性
   * @default false
   */
  defaultValue: SwitchValue;
  /**
   * 数据发生变化时触发
   */
  onChange: (value: SwitchValue) => void;
}

export type SwitchValue = string | number | boolean;
