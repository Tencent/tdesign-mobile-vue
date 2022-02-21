/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface TdStepperProps {
  /**
   * 禁用全部操作
   * @default false
   */
  disabled?: boolean;
  /**
   * 禁用输入框
   * @default false
   */
  disableInput?: boolean;
  /**
   * 输入框宽度
   */
  inputWidth?: number;
  /**
   * 最大值
   * @default 100
   */
  max?: number;
  /**
   * 最小值
   * @default 0
   */
  min?: number;
  /**
   * 步长
   * @default 1
   */
  step?: number;
  /**
   * 组件风格
   * @default normal
   */
  theme?: 'normal' | 'grey';
  /**
   * 值
   * @default 0
   */
  value?: string | number;
  /**
   * 值，非受控属性
   * @default 0
   */
  defaultValue?: string | number;
  /**
   * 输入框失去焦点时触发
   */
  onBlur?: (value: string | number) => void;
  /**
   * 数值发生变更时触发
   */
  onChange?: (value: string | number) => void;
  /**
   * 数值超出限制时触发
   */
  onOverlimit?: (type: 'minus' | 'plus') => void;
}
