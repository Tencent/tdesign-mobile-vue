/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdInputProps {
  /**
   * 文本内容位置，居左/居中/居右
   * @default left
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 超出 `maxlength` 或 `maxcharacter` 之后是否允许继续输入
   * @default false
   */
  allowInputOverMax?: boolean;
  /**
   * 是否开启自动填充功能，HTML5 原生属性，[点击查看详情](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   */
  autocomplete?: string;
  /**
   * 自动聚焦
   * @default false
   */
  autofocus?: boolean;
  /**
   * 是否开启无边框模式
   * @default false
   */
  borderless?: boolean;
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 是否禁用输入框
   */
  disabled?: boolean;
  /**
   * 【暂不支持】指定输入框展示值的格式
   */
  format?: InputFormatType;
  /**
   * 左侧文本
   */
  label?: string | TNode;
  /**
   * 标题输入框布局方式
   * @default horizontal
   */
  layout?: 'vertical' | 'horizontal';
  /**
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  maxcharacter?: number;
  /**
   * 用户最多可以输入的文本长度，一个中文等于一个计数长度。值为空，则表示不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  maxlength?: number;
  /**
   * 名称
   * @default ''
   */
  name?: string;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 组件前置图标
   */
  prefixIcon?: TNode;
  /**
   * 只读状态
   * @default false
   */
  readonly?: boolean;
  /**
   * 输入框状态。默认情况会由组件内部根据实际情况呈现，如果文本过长引起的状态变化
   */
  status?: 'default' | 'success' | 'warning' | 'error';
  /**
   * 后置图标前的后置内容
   */
  suffix?: string | TNode;
  /**
   * 组件后置图标
   */
  suffixIcon?: TNode;
  /**
   * 输入框下方提示文本，会根据不同的 `status` 呈现不同的样式
   */
  tips?: string | TNode;
  /**
   * 输入框类型
   * @default text
   */
  type?: 'text' | 'number' | 'url' | 'tel' | 'password' | 'search' | 'submit' | 'hidden';
  /**
   * 输入框的值
   * @default ''
   */
  value?: InputValue;
  /**
   * 输入框的值，非受控属性
   * @default ''
   */
  defaultValue?: InputValue;
  /**
   * 输入框的值
   * @default ''
   */
  modelValue?: InputValue;
  /**
   * 失去焦点时触发
   */
  onBlur?: (value: InputValue, context: { e: FocusEvent }) => void;
  /**
   * 输入框值发生变化时触发。`trigger=initial` 表示传入的数据不符合预期，组件自动处理后触发 change 告知父组件。如：初始值长度超过 `maxlength` 限制
   */
  onChange?: (
    value: InputValue,
    context?: { e?: InputEvent | MouseEvent | CompositionEvent; trigger: 'input' | 'initial' | 'clear' },
  ) => void;
  /**
   * 清空按钮点击时触发
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 获得焦点时触发
   */
  onFocus?: (value: InputValue, context: { e: FocusEvent }) => void;
  /**
   * 【暂不支持】字数超出限制时触发
   */
  onValidate?: (context: { error?: 'exceed-maximum' | 'below-minimum' }) => void;
}

export type InputFormatType = (value: InputValue) => string;

export type InputValue = string;
