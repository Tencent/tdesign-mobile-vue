import { VNode, App, Plugin } from 'vue';

// TNode 类型表示该字段类型支持 Function , 以及同名作用域插槽（Slot / ScopedSlot ）。其中，Function 优先级大于 Slot。
export type TNode = (...args: any[]) => VNode;

// size 默认值固定为：small/medium/large。
export type SizeEnum = 'small' | 'medium' | 'large';

// 横向
export type HorizontalAlignEnum = 'left' | 'center' | 'right';

// 纵向
export type VerticalAlignEnum = 'top' | 'middle' | 'bottom';

export const withInstall = <T>(comp: T): T & Plugin => {
  const c = comp as any;

  c.install = function (app: App, name = '') {
    app.component(name || c.name, comp);
  };

  return comp as T & Plugin;
};
