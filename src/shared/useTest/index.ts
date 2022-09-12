import sleep from 'lodash';

export function useTest() {
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
