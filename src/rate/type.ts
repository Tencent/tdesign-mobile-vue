/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * updated at 2021-12-31 11:51:01
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
   * 评分图标的颜色，样式中默认为 #ED7B2F
   * @default ''
   */
  color: string | Array<string>;
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
   * 是否显示对应的辅助文字
   * @default false
   */
  showText: boolean;
  /**
   * 评分图标的大小，示例：`20`
   * @default ''
   */
  size: string;
  /**
   * 自定义评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分']
   */
  texts: Array<string>;
  /**
   * 选择评分的值
   * @default 0
   */
  value: number;
  /**
   * 选择评分的值，非受控属性
   * @default 0
   */
  defaultValue: number;
  /**
   * 评分数改变时触发
   */
  onChange: (value: number) => void;
}
