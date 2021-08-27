/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-27 17:34:36
 * */

export interface TdStepperProps {
  /**
   * 禁用
   * @default false
   */
  disabled: boolean;
  /**
   * 禁用输入框
   * @default false
   */
  disableInput: boolean;
  /**
   * 输入框宽度
   */
  inputWidth: number;
  /**
   * 标签
   * @default ''
   */
  label: string;
  /**
   * 最大值
   * @default 100
   */
  max: number;
  /**
   * 最小值
   * @default 0
   */
  min: number;
  /**
   * 步进
   * @default 1
   */
  step: number;
  /**
   * 组件风格
   * @default normal
   */
  theme: 'normal' | 'mode';
  /**
   * 值
   * @default 0
   */
  value: string | number;
};
