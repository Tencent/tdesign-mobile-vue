import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { defineComponent, nextTick, ref } from 'vue';
import { useSwipe } from '../useSwipe';
import type { UseSwipeOptions, UseSwipeReturn } from '../useSwipe';
import { trigger } from '../../../test/utils/touch';

/**
 * 挂载一个使用 useSwipe 的宿主组件。
 * useSwipe 内部经 @vueuse/core useEventListener（post-flush watcher）挂载触摸监听，
 * 挂载完成后需等待一个 tick 再触发触摸事件。
 */
async function mountSwipeHost(options?: UseSwipeOptions) {
  let swipe: UseSwipeReturn | undefined;
  const Host = defineComponent({
    setup() {
      const el = ref<HTMLElement>();
      swipe = useSwipe(el, options);
      return () => <div ref={el} class="swipe-host" />;
    },
  });
  const wrapper = mount(Host);
  await nextTick();
  return { wrapper, swipe: swipe as UseSwipeReturn };
}

describe('useSwipe', () => {
  it('tracks horizontal swipe', async () => {
    const { wrapper, swipe } = await mountSwipeHost({ threshold: 0 });
    const $host = wrapper.find('.swipe-host');

    // 向左滑：diffX = startX - endX > 0
    await trigger($host, 'touchstart', 100, 100);
    await trigger($host, 'touchmove', 40, 100);

    expect(swipe.lengthX.value).toBe(60);
    expect(swipe.lengthY.value).toBe(0);
    expect(swipe.direction.value).toBe('left');
    expect(swipe.isSwiping.value).toBe(true);
    expect(swipe.coordsStart.x).toBe(100);
    expect(swipe.coordsEnd.x).toBe(40);

    await trigger($host, 'touchend', 40, 100);
    expect(swipe.isSwiping.value).toBe(false);

    // 向右滑：direction 为 right
    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', 30, 0);
    expect(swipe.lengthX.value).toBe(-30);
    expect(swipe.direction.value).toBe('right');
  });

  it('tracks vertical swipe', async () => {
    const { wrapper, swipe } = await mountSwipeHost({ threshold: 0 });
    const $host = wrapper.find('.swipe-host');

    // 向上滑：direction 为 up
    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', 0, -50);

    expect(swipe.lengthX.value).toBe(0);
    expect(swipe.lengthY.value).toBe(50);
    expect(swipe.direction.value).toBe('up');

    // 向下滑：direction 为 down
    await trigger($host, 'touchend', 0, -50);
    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', 0, 50);
    expect(swipe.lengthY.value).toBe(-50);
    expect(swipe.direction.value).toBe('down');
  });

  it('does not start swiping until threshold is exceeded', async () => {
    const onSwipe = vi.fn();
    const onSwipeEnd = vi.fn();
    const { wrapper, swipe } = await mountSwipeHost({ threshold: 20, onSwipe, onSwipeEnd });
    const $host = wrapper.find('.swipe-host');

    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', -10, 0);
    // 位移 10px 未达到 threshold(20)，不进入滑动状态
    expect(swipe.isSwiping.value).toBe(false);
    expect(swipe.direction.value).toBe('none');
    expect(onSwipe).not.toHaveBeenCalled();

    await trigger($host, 'touchend', -10, 0);
    expect(onSwipeEnd).not.toHaveBeenCalled();

    // 达到阈值后进入滑动状态并回调
    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', -25, 0);
    expect(swipe.isSwiping.value).toBe(true);
    expect(onSwipe).toHaveBeenCalledTimes(1);
    await trigger($host, 'touchend', -25, 0);
    expect(onSwipeEnd).toHaveBeenCalledTimes(1);
    expect(onSwipeEnd).toHaveBeenLastCalledWith(expect.anything(), 'left');
  });

  it('invokes onSwipeStart once per gesture', async () => {
    const onSwipeStart = vi.fn();
    const { wrapper } = await mountSwipeHost({ threshold: 0, onSwipeStart });
    const $host = wrapper.find('.swipe-host');

    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', -10, 0);
    await trigger($host, 'touchmove', -30, 0);
    // 手势内多次 move 只在 touchstart 回调一次
    expect(onSwipeStart).toHaveBeenCalledTimes(1);

    await trigger($host, 'touchend', -30, 0);
    await trigger($host, 'touchstart', 0, 0);
    expect(onSwipeStart).toHaveBeenCalledTimes(2);
  });

  it('ignores multi-touch gestures', async () => {
    const { wrapper, swipe } = await mountSwipeHost({ threshold: 0 });
    const $host = wrapper.find('.swipe-host');

    // 单指滑动更新坐标
    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', -60, 0);
    expect(swipe.lengthX.value).toBe(60);

    // 多指触摸不更新坐标、不进入滑动
    await trigger($host, 'touchstart', 0, 0, { x: 40, y: 0 });
    await trigger($host, 'touchmove', -60, 0, { x: -30, y: 0 });
    expect(swipe.lengthX.value).toBe(60);
    expect(swipe.isSwiping.value).toBe(true);
  });

  it('stop removes all listeners', async () => {
    const onSwipe = vi.fn();
    const { wrapper, swipe } = await mountSwipeHost({ threshold: 0, onSwipe });
    const $host = wrapper.find('.swipe-host');

    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', -30, 0);
    expect(onSwipe).toHaveBeenCalledTimes(1);

    swipe.stop();
    await trigger($host, 'touchstart', 0, 0);
    await trigger($host, 'touchmove', -60, 0);
    await trigger($host, 'touchend', -60, 0);
    expect(onSwipe).toHaveBeenCalledTimes(1);
  });
});
