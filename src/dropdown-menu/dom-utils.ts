/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// 获取相对定位容器
export const findRelativeContainer = (dom: any) => {
  let node = dom;
  while (node && node !== document.body) {
    const { transform } = getComputedStyle(node);
    if (!/matrix\([\d,\s]+\)/.test(transform)) {
      node = node.parentNode;
      continue;
    }
    return node;
  }
  return null;
};

// 获取相对定位视区参数
export const findRelativeRect = (dom: any) => {
  const container = findRelativeContainer(dom);
  const containerRect = container
    ? container.getBoundingClientRect()
    : {
        top: 0,
        left: 0,
      };
  const { top, left, bottom, right, width, height } = dom.getBoundingClientRect();
  return {
    top: top - containerRect.top,
    bottom: bottom - containerRect.top,
    left: left - containerRect.left,
    right: right - containerRect.left,
    width,
    height,
  };
};
