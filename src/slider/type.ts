/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-14 00:39:24
 * */

export interface TdSliderProps {
  /**
   * 是否禁用组件
   * @default false
   */
  disabled: boolean;
  /**
   * 刻度标记，示例：`[0, 10, 40, 200]` 或者 `{ 5:  '5¥', 10: '10%' }`
   * @default {}
   */
  marks: Record<number, string> | Array<number>;
  /**
   * 滑块范围最大值
   * @default 100
   */
  max: number;
  /**
   * 滑块范围最小值
   * @default 0
   */
  min: number;
  /**
   * 双游标滑块
   * @default false
   */
  range: boolean;
  /**
   * 是否显示当前滑动的值
   * @default false
   */
  showValue: boolean;
  /**
   * 步长
   * @default 1
   */
  step: number;
  /**
   * 滑块值
   */
  value: SliderValue;
  /**
   * 滑块值，非受控属性
   */
  defaultValue: SliderValue;
  /**
   * 滑块值变化时触发
   */
  onChange: (value: SliderValue) => void;
  /**
   * 结束拖动时触发
   */
  onDragEnd: () => void;
  /**
   * 开始拖动时触发
   */
  onDragStart: () => void;
};

export type SliderValue = number | Array<number>;
