import { sleep } from '../util';

/**
 * 测试相关的工具方法
 */
export function useTestUtils() {
  const makeScroll = async (dom: Element, name: 'scrollTop' | 'scrollLeft', offset: number) => {
    const eventTarget = dom === document.documentElement ? window : dom;
    dom[name] = offset;
    const evt = new CustomEvent('scroll', {
      detail: {
        target: {
          [name]: offset,
        },
      },
    });
    eventTarget.dispatchEvent(evt);
    // must use setTimeout instead of nextTick to wait dom change
    await sleep(0);
  };

  return { makeScroll, sleep };
}

/**
 * 测试相关的vitest方法
 */
export function useVitest(vi: (typeof import('vitest'))['vitest']) {
  const getBoundingClientRect = (dom: Element) => vi.spyOn(dom, 'getBoundingClientRect');

  return { getBoundingClientRect };
}
