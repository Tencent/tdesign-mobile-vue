import { h, createTextVNode, ComponentInternalInstance, Slots } from 'vue';

/**
 * 渲染 TNode，props 和 插槽同时处理。与 renderTNodeJSX 区别在于 属性值为 undefined 时会渲染默认节点
 * @param instance 组件示例
 * @param name 插槽和属性名称
 * @param defaultNode 缺省插槽内容
 * @example renderTNode(getCurrentInstance(), 'closeBtn')
 * @example renderTNode(getCurrentInstance(), 'closeBtn', <t-icon-close />)。this.closeBtn 为空时，则兜底渲染 <t-icon-close />
 */
export const renderTNode = (
  instance: ComponentInternalInstance | null,
  name: string,
  defaultNode?: Slots | JSX.Element,
): any => {
  if (instance === null) {
    return h('', null);
  }
  const propsNode = instance.props[name];
  if (propsNode) {
    if (typeof propsNode === 'function') {
      return propsNode(h);
    }
    if (typeof propsNode === 'string') {
      return createTextVNode(propsNode);
    }
  }
  return instance.slots[name] ? instance.slots[name]?.call(null) : defaultNode;
};

// content 优先级控制：name1 优先级高于 name2
export const renderContent = (instance: ComponentInternalInstance | null, name1: string, name2: string): any => {
  if (instance === null) {
    return h('', null);
  }
  let nodeContent = renderTNode(instance, name1);
  if ([undefined, null, ''].includes(nodeContent)) {
    nodeContent = renderTNode(instance, name2);
  }
  return nodeContent;
};
