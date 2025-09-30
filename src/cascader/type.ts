/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { OverlayProps } from '../overlay';
import { TNode, TreeOptionData, TreeKeysType } from '../common';

export interface TdCascaderProps<CascaderOption extends TreeOptionData = TreeOptionData> {
  /**
   * 父子节点选中状态不再关联，可各自选中或取消
   * @default false
   */
  checkStrictly?: boolean;
  /**
   * 关闭按钮
   * @default true
   */
  closeBtn?: boolean | TNode;
  /**
   * 头部
   */
  header?: TNode;
  /**
   * 用来定义 value / label / children / disabled 在 `options` 中对应的字段别名
   */
  keys?: CascaderKeysType;
  /**
   * 中间内容
   */
  middleContent?: TNode;
  /**
   * 可选项数据源
   * @default []
   */
  options?: Array<CascaderOption>;
  /**
   * 遮罩层的属性，透传至 overlay
   * @default {}
   */
  overlayProps?: OverlayProps;
  /**
   * 未选中时的提示文案
   * @default '选择选项'
   */
  placeholder?: string | TNode;
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
   * 值发生变更时触发
   */
  onChange?: (value: string | number, selectedOptions: CascaderOption[]) => void;
  /**
   * 关闭时触发
   */
  onClose?: (trigger: CascaderTriggerSource) => void;
  /**
   * 选择后触发
   */
  onPick?: (context: { value: string | number; label: string; index: number; level: number }) => void;
}

export type CascaderKeysType = TreeKeysType;

export type CascaderTriggerSource = 'overlay' | 'close-btn' | 'finish';
