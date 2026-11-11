import { vi } from 'vitest';

export type RectInit = Partial<DOMRect>;

/** 以 0 填充缺失字段，构造确定性的 DOMRect（jsdom 不执行布局，原生的 rect 恒为全 0） */
export function createRect(init: RectInit = {}): DOMRect {
  const { top = 0, left = 0, width = 0, height = 0 } = init;
  return {
    x: init.x ?? left,
    y: init.y ?? top,
    top,
    left,
    right: init.right ?? left + width,
    bottom: init.bottom ?? top + height,
    width,
    height,
    toJSON: () => ({}),
  } as DOMRect;
}

/**
 * jsdom 中 getBoundingClientRect 恒为全 0，测宽 / 定位类逻辑无法触发。
 * 按元素 classList 中的类名映射矩形（命中任一类名即返回），未命中时返回 defaultRect。
 * 返回 spy，可通过 `vi.restoreAllMocks()` 或 `spy.mockRestore()` 还原。
 */
export function mockRectByClass(rects: Record<string, RectInit>, defaultRect: RectInit = {}) {
  return vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    for (const className of Array.from(this.classList)) {
      const rect = rects[className];
      if (rect) return createRect(rect);
    }
    return createRect(defaultRect);
  });
}
