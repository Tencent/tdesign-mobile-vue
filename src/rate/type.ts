/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-09-19 22:39:42
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
   * @default #ED7B2F
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
   * 自定义评分等级对应的辅助文字，组件内部默认为：['极差', '失望', '一般', '满意', '惊喜']
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
   * 形状类型，有描边类型和填充类型两种
   * @default outline
   */
  variant: 'outline' | 'filled';
  /**
   * 评分数改变时触发
   */
  onChange: (value: number) => void;
};
