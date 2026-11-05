/**
 * PullDownRefresh 使用了 [`useElementSize()`](https://github.com/vueuse/vueuse/blob/658374fd12/packages/core/useElementSize/index.ts)，
 * 该函数调用了 [`useResizeObserver()`](https://github.com/vueuse/vueuse/blob/658374fd12fbce2ac6127a9fb9bca52fb2137505/packages/core/useResizeObserver/index.ts)。
 *
 * 而 jsdom 中 ResizeObserver 无效，见： https://github.com/jsdom/jsdom/issues/3368
 *
 * @description 模拟实现 ResizeObserver
 * @params callback `new ResizeObserver(callback)` 中的回调，签名如下：
 *
 * ```ts
 * ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void
 * ```
 */
export class MockResizeObserver {
  _callback: Function;

  _element!: HTMLElement;

  constructor(callback: Function) {
    this._callback = callback;
  }

  observe(element: HTMLElement) {
    this._element = element;
    this._element.addEventListener('resize', this.trigger);
  }

  unobserve() {
    this._element.removeEventListener('resize', this.trigger);
  }

  disconnect() {
    // unmount后监听的元素this._element可能为null，因此先判断元素是否为null，再依据此来是否执行removeEventListener
    if (this._element) {
      this._element.removeEventListener('resize', this.trigger);
    }
    this._element = null;
  }

  /**
   * @description 手动触发 resize，提供参数。本例 `maxBarHeight` 始终为 `useElementSize()` 的默认初始值 `initialSize`（`{ width: 0, height: 0 }`），模拟返回有效值即可
   * @param event 手动触发
   */
  trigger = (event: UIEvent) => {
    const { width = 0, height = 0 } = event as { width?: number; height?: number };
    this._callback([
      {
        contentRect: { width, height },
      },
    ]);
  };
}
