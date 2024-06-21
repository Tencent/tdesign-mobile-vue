/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TNode, TreeOptionData, KeysType } from '../common';

export interface TdCascaderProps<CascaderOption extends TreeOptionData = TreeOptionData> {
  /**
   * 关闭按钮
   * @default true
   */
  closeBtn?: boolean | TNode;
  /**
   * 用来定义 value / label 在 `options` 中对应的字段别名
   */
  keys?: KeysType;
  /**
   * 可选项数据源
   * @default []
   */
  options?: Array<CascaderOption>;
  /**
   * 每级展示的次标题
   * @default []
   */
  subTitles?: Array<string>;
  /**
   * 展示风格
   * @default step
   */
  theme?: 'step' | 'tab';
  /**
   * 标题
   */
  title?: string | TNode;
  /**
   * 选项值
   */
  value?: string | number;
  /**
   * 选项值，非受控属性
   */
  defaultValue?: string | number;
  /**
   * 选项值
   */
  modelValue?: string | number;
  /**
   * 是否展示
   * @default false
   */
  visible?: boolean;
  /**
   * 未选中时的提示文案
   */
  placeholder?: string | TNode;
  /**
   * 值发生变更时触发
   */
  onChange?: (value: string | number, selectedOptions: string[]) => void;
  /**
   * 关闭时触发
   */
  onClose?: (trigger: CascaderTriggerSource) => void;
  /**
   * 选择后触发
   */
  onPick?: (context: { level: number; value: string | number; index: number }) => void;
}

export type CascaderTriggerSource = 'overlay' | 'close-btn' | 'finish';
