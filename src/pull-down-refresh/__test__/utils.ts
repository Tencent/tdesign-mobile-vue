import { ComponentPublicInstance, nextTick } from 'vue';
import { VueWrapper, DOMWrapper } from '@vue/test-utils';

function getTouch(el: Element | Window, x: number, y: number) {
  return {
    identifier: Date.now(),
    target: el,
    pageX: x,
    pageY: y,
    clientX: x,
    clientY: y,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  };
}

// 模拟 touch 事件
export function trigger(
  wrapper: VueWrapper<ComponentPublicInstance<any, any, any>> | DOMWrapper<Element> | Element | Window,
  eventName: string,
  x = 0,
  y = 0,
  options: any = {},
) {
  const el = 'element' in wrapper ? wrapper.element : wrapper;
  const touchList = options.touchList || [getTouch(el, x, y)];

  if (options.x || options.y) {
    touchList.push(getTouch(el, options.x, options.y));
  }

  const event = document.createEvent('CustomEvent');
  event.initCustomEvent(eventName, true, true, {});

  Object.assign(event, {
    clientX: x,
    clientY: y,
    touches: touchList,
    targetTouches: touchList,
    changedTouches: touchList,
  });

  el.dispatchEvent(event);

  return nextTick();
}

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
    this._element.removeEventListener('resize', this.trigger);
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
