/* eslint-disable */

/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { PopupProps } from '../popup';
import { TNode } from '../common';

export interface TdColorPickerProps {
  /**
   * 自动关闭。在点击遮罩层时自动关闭，不需要手动设置 visible
   * @default true
   */
  autoClose?: boolean;
  /**
   * 是否可清空
   * @default false
   */
  clearable?: boolean;
  /**
   * 是否开启透明通道
   * @default false
   */
  enableAlpha?: boolean;
  /**
   * 底部插槽，仅在 `usePopup` 为 `true` 时有效
   */
  footer?: TNode;
  /**
   * 格式化色值。`enableAlpha` 为真时，`RGBA/HSLA/HSVA` 等值有效
   * @default RGB
   */
  format?: 'RGB' | 'RGBA' | 'HSL' | 'HSLA' | 'HSB' | 'HSV' | 'HSVA' | 'HEX' | 'CMYK' | 'CSS';
  /**
   * 顶部插槽，仅在 `usePopup` 为 `true` 时有效
   */
  header?: TNode;
  /**
   * 透传 Popup 组件全部属性
   * @default {}
   */
  popupProps?: PopupProps;
  /**
   * 系统预设的颜色样例，值为 `null` 或 `[]` 则不显示系统色，值为 `undefined` 会显示组件内置的系统默认色
   */
  swatchColors?: Array<string> | null;
  /**
   * 颜色选择器类型。（base 表示仅展示系统预设内容; multiple 表示展示色板和系统预设内容
   * @default base
   */
  type?: TypeEnum;
  /**
   * 是否使用弹出层包裹颜色选择器
   * @default false
   */
  usePopup?: boolean;
  /**
   * 色值
   * @default ''
   */
  value?: string;
  /**
   * 色值，非受控属性
   * @default ''
   */
  defaultValue?: string;
  /**
   * 色值
   * @default ''
   */
  modelValue?: string;
  /**
   * 是否显示颜色选择器。`usePopup` 为 true 时有效
   * @default false
   */
  visible?: boolean;
  /**
   * 选中的色值发生变化时触发，第一个参数 `value` 表示新色值，`context.color` 表示当前调色板控制器的色值，`context.trigger` 表示触发颜色变化的来源
   */
  onChange?: (value: string, context: { color: ColorObject; trigger: ColorPickerChangeTrigger }) => void;
  /**
   * 关闭按钮时触发
   */
  onClose?: (trigger: ColorPickerTrigger) => void;
  /**
   * 调色板控制器的值变化时触发，`context.color` 指调色板控制器的值
   */
  onPaletteBarChange?: (context: { color: ColorObject }) => void;
}

export type TypeEnum = 'base' | 'multiple';

export type ColorPickerChangeTrigger =
  | 'palette-saturation-brightness'
  | 'palette-saturation'
  | 'palette-brightness'
  | 'palette-hue-bar'
  | 'palette-alpha-bar'
  | 'input'
  | 'preset'
  | 'recent';

export type ColorPickerTrigger = 'overlay';

export interface ColorObject {
  alpha: number;
  css: string;
  hex: string;
  hex8: string;
  hsl: string;
  hsla: string;
  hsv: string;
  hsva: string;
  rgb: string;
  rgba: string;
  value: number;
}
