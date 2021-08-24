// TNode 类型表示该字段类型支持 Function , 以及同名作用域插槽（Slot / ScopedSlot ）。其中，Function 优先级大于 Slot。
export type TNode = (...args: any[]) => import('vue').VNode;

export type SizeEnum = 'small' | 'medium' | 'large';
