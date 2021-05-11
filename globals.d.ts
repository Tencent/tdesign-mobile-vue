/** Vue3 特有全局变量 */
declare const VERSION: string;

// 组件版本变量
declare const __VERSION__: string;

// TNode 类型表示该字段类型支持 Function , 以及同名作用域插槽（Slot / ScopedSlot ）。其中，Function 优先级大于 Slot。
declare type TNode = (...args: any[]) => import('vue').VNode;

/** 通用全局变量 */

declare type OptionData = {
  label?: string;
  value?: string | number;
} & { [key: string]: any };

declare type TreeOptionData = {
  children?: Array<TreeOptionData>;
} & OptionData;

declare type SizeEnum = 'small' | 'medium' | 'large';

declare type HorizontalAlignEnum = 'left' | 'center' | 'right';

declare type VerticalAlignEnum = 'top' | 'middle' | 'bottom';

declare type ClassName = { [className: string]: any } | ClassName[] | string;

declare type CSSSelector = string;
