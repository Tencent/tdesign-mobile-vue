/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { SelectInputProps, SelectInputBlurContext, SelectInputValueChangeContext } from '../select-input';
import { TagProps } from '../tag';
import { TreeOptionData, TreeKeysType } from '../common';

export interface TdTreeSelectProps {
  /**
   * 是否允许清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 自定义组件样式
   * @default ''
   */
  customStyle?: string;
  /**
   * 是否可搜索
   * @default false
   */
  filterable?: boolean;
  /**
   * 高度，默认单位为 px
   * @default 336
   */
  height?: string | number;
  /**
   * 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label: 'name', children: 'list' }`
   */
  keys?: TreeKeysType;
  /**
   * 是否允许多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 是否多选
   * @default false
   */
  multiple?: boolean;
  /**
   * 选项
   * @default []
   */
  options?: Array<DataOption>;
  /**
   * 占位符
   */
  placeholder?: string;
  /**
   * 【开发中】透传 SelectInput 筛选器输入框组件的全部属性
   */
  selectInputProps?: SelectInputProps;
  /**
   * 尺寸
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 透传 Tag 标签组件全部属性
   */
  tagProps?: TagProps;
  /**
   * 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`
   */
  value?: TreeValueType;
  /**
   * 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`，非受控属性
   */
  defaultValue?: TreeValueType;
  /**
   * 选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`
   */
  modelValue?: TreeValueType;
  /**
   * 节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源。泛型 `TreeValueType` 继承自 `TreeSelectValue`
   */
  onChange?: (value: TreeValueType, context: TreeSelectChangeContext<DataOption>) => void;
}

export type TreeSelectValue = string | number | TreeOptionData | Array<string | number | TreeOptionData>;

export type TreeSelectValue = string | number | TreeOptionData | Array<string | number | TreeOptionData>;

export interface TreeSelectChangeContext<DataOption> {
  node: TreeNodeModel<DataOption>;
  data: DataOption;
  index?: number;
  trigger: TreeSelectValueChangeTrigger;
  e?: MouseEvent | KeyboardEvent | Event;
}

export type TreeSelectValueChangeTrigger = 'clear' | 'tag-remove' | 'backspace' | 'check' | 'uncheck';
