/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-08-25 19:07:29
 * */

export interface TdRateProps {
  /**
   * 是否允许半选
   * @default false
   */
  allowHalf: boolean;
  /**
   * 是否允许取消选择
   * @default false
   */
  clearable: boolean;
  /**
   * 评分图标的颜色
   * @default #ffc51c
   */
  color: string;
  /**
   * 评分的数量
   * @default 5
   */
  count: number;
  /**
   * 是否为只读
   * @default false
   */
  readonly: boolean;
  /**
   * 是否显示辅助文字
   * @default false
   */
  showText: boolean;
  /**
   * 评分图标的大小
   * @default 48
   */
  size: string;
  /**
   * 自定义评分等级对应的辅助文字
   */
  texts: Array<string>;
  /**
   * 选择评分的值
   */
  value: number;
  /**
   * 选择评分的值，非受控属性
   */
  defaultValue: number;
  /**
   * 评分数改变时触发
   */
  onChange: (value: number) => void;
};
