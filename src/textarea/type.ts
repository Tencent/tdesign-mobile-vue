/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

export interface TdTextareaProps {
  /**
   * 自动聚焦，拉起键盘
   * @default false
   */
  autofocus: boolean;
  /**
   * 是否自动增高，值为 autosize 时，style.height 不生效
   * @default false
   */
  autosize: boolean;
  /**
   * 是否禁用文本框
   * @default false
   */
  disabled: boolean;
  /**
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度
   */
  maxcharacter: number;
  /**
   * 用户最多可以输入的字符个数
   */
  maxlength: number;
  /**
   * 名称，HTML 元素原生属性
   * @default ''
   */
  name: string;
  /**
   * 占位符
   */
  placeholder: string;
  /**
   * 文本框值
   */
  value: TextareaValue;
  /**
   * 文本框值，非受控属性
   */
  defaultValue: TextareaValue;
  /**
   * 失去焦点时触发
   */
  onBlur: (value: TextareaValue, context: { e: FocusEvent }) => void;
  /**
   * 输入内容变化时触发
   */
  onChange: (value: TextareaValue, context?: { e?: InputEvent }) => void;
  /**
   * 获得焦点时触发
   */
  onFocus: (value: TextareaValue, context: { e: FocusEvent }) => void;
}

export type TextareaValue = string | number;
