import { ref } from 'vue';

const isElement = (node: Element) => {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== 'HTML' && node.tagName !== 'BODY' && node.nodeType === ELEMENT_NODE_TYPE;
};

export function useTouch() {
  const startX = ref(0);
  const startY = ref(0);
  const diffX = ref(0);
  const diffY = ref(0);
  const start = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    startX.value = clientX;
    startY.value = clientY;
    diffY.value = 0;
    diffX.value = 0;
  };
  const move = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    diffY.value = clientY - startY.value;
    diffX.value = clientX - startX.value;
  };
  return {
    startX,
    startY,
    diffX,
    diffY,
    start,
    move,
  };
}

// 缓动函数
export const easeDistance = (distance: number, pullDistance: number) => {
  if (distance > pullDistance) {
    if (distance < pullDistance * 2) {
      distance = pullDistance + (distance - pullDistance) / 2;
    } else {
      distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4;
    }
  }
  return Math.round(distance);
};
// 获取最新的可滚动父元素
export const getScrollParent = (node: Element) => {
  let res = node;
  while (res && isElement(res)) {
    if (/auto|scroll/i.test(window.getComputedStyle(res).overflowY)) {
      return res;
    }
    res = res.parentNode as Element;
  }
};
// 确保可滚动的父元素此时处于未滚动状态
export const isReachTop = (e: TouchEvent) => {
  const scrollParent = getScrollParent(e.target as Element);
  return !scrollParent || !scrollParent.scrollTop;
};
