/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode } from '../common';

export interface TdSearchProps {
  /**
   * 自定义右侧操作按钮文字，如：“取消”
   * @default ''
   */
  action?: string | TNode;
  /**
   * 【讨论中】联想词列表，如果不存在或长度为 0 则不显示联想框。可以使用函数 `label` 自定义联想词为任意内容；也可使用插槽 `option` 定义联想词内容，插槽参数为 `{ option: AutocompleteOption; index: number }`。如果 `group` 值为 `true` 则表示当前项为分组标题
   */
  autocompleteOptions?: Array<AutocompleteOption>;
  /**
   * 是否居中
   * @default false
   */
  center?: boolean;
  /**
   * 是否可清空
   * @default true
   */
  clearable?: boolean;
  /**
   * 禁用状态
   */
  disabled?: boolean;
  /**
   * 是否聚焦
   * @default false
   */
  focus?: boolean;
  /**
   * 左侧图标
   * @default 'search'
   */
  leftIcon?: string | TNode;
  /**
   * 用户最多可以输入的文本长度，一个中文等于一个计数长度。默认为 -1，不限制输入长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  maxLength?: string | number;
  /**
   * 用户最多可以输入的字符个数，一个中文汉字表示两个字符长度。`maxcharacter` 和 `maxlength` 二选一使用
   */
  maxcharacter?: number;
  /**
   * 占位符
   * @default ''
   */
  placeholder?: string;
  /**
   * 只读状态
   */
  readonly?: boolean;
  /**
   * 预览结果列表
   * @default []
   */
  resultList?: Array<string>;
  /**
   * 搜索框形状
   * @default 'square'
   */
  shape?: 'square' | 'round';
  /**
   * 值，搜索关键词
   * @default ''
   */
  value?: string;
  /**
   * 值，搜索关键词，非受控属性
   * @default ''
   */
  defaultValue?: string;
  /**
   * 值，搜索关键词
   * @default ''
   */
  modelValue?: string;
  /**
   * 点击搜索框右侧操作内容时触发
   * @default ''
   */
  onActionClick?: (context: { e: MouseEvent }) => void;
  /**
   * 失去焦点时触发
   * @default ''
   */
  onBlur?: (context: { value: string; e: FocusEvent }) => void;
  /**
   * 搜索关键词发生变化时触发，可能场景有：搜索框内容发生变化、点击联想词
   * @default ''
   */
  onChange?: (value: string, context: { e?: InputEvent | MouseEvent }) => void;
  /**
   * 点击清除时触发
   * @default ''
   */
  onClear?: (context: { e: MouseEvent }) => void;
  /**
   * 获得焦点时触发
   * @default ''
   */
  onFocus?: (context: { value: string; e: FocusEvent }) => void;
  /**
   * 【讨论中】搜索触发，包含：手机键盘提交健、联想关键词点击、清空按钮点击等
   * @default ''
   */
  onSearch?: (context?: {
    value: string;
    trigger: 'submit' | 'option-click' | 'clear';
    e?: InputEvent | MouseEvent;
  }) => void;
  /**
   * 提交时触发，如：手机键盘提交按钮点击
   * @default ''
   */
  onSubmit?: (context: { value: string; e: KeyboardEvent }) => void;
}

export type AutocompleteOption = string | { label: string | TNode; group?: boolean };
