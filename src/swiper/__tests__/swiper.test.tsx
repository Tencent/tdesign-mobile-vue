import { afterEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { trigger } from '../../image-viewer/__tests__/touch';
import Swiper from '../swiper';
import SwiperItem from '../swiper-item';
import type { SwiperNavigation } from '../type';
import {
  classPrefix,
  finishTransition,
  flush,
  getActiveDotIndex,
  getContainer,
  getDots,
  images,
  mockElementSize,
  mountSwiper,
  navClassPrefix,
  swipeBy,
} from './mount';

enableAutoUnmount(afterEach);

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('Swiper', () => {
  describe('props', () => {
    // animation 仅支持 slide 一种取值，且组件源码未消费该属性，无差异可断言
    it.todo('animation[string]');

    it('autoplay[boolean]', async () => {
      vi.useFakeTimers();
      try {
        const onChange = vi.fn();
        mount({
          setup() {
            return () => (
              <Swiper autoplay interval={200} onChange={onChange}>
                {images.map((image) => (
                  <SwiperItem key={image}>
                    <img src={image} />
                  </SwiperItem>
                ))}
              </Swiper>
            );
          },
        });
        await vi.advanceTimersByTimeAsync(200);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(1, { source: 'autoplay' });

        // autoplay = false 时不会自动切换
        const onChangeStopped = vi.fn();
        mountSwiper({ autoplay: false, interval: 200, onChange: onChangeStopped });
        await vi.advanceTimersByTimeAsync(1000);
        expect(onChangeStopped).not.toHaveBeenCalled();
      } finally {
        vi.useRealTimers();
      }
    });

    it('current[number]', async () => {
      const current = ref(1);
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper current={current.value} autoplay={false}>
              {images.map((image) => (
                <SwiperItem key={image}>
                  <img src={image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      await flush();
      // 受控初始值：第 current 项为激活态
      expect(getDots(wrapper)).toHaveLength(images.length);
      expect(getActiveDotIndex(wrapper)).toBe(1);

      // 外部修改 current 后激活项跟随切换，并同步 update:current
      current.value = 2;
      await flush();
      expect(getActiveDotIndex(wrapper)).toBe(2);
      expect(wrapper.findComponent(Swiper).emitted('update:current')).toEqual([[2]]);
    });

    it('modelValue[number]', async () => {
      vi.useFakeTimers();
      try {
        const current = ref(0);
        const wrapper = mount({
          setup() {
            return () => (
              <Swiper v-model={current.value} autoplay interval={200}>
                {images.map((image) => (
                  <SwiperItem key={image}>
                    <img src={image} />
                  </SwiperItem>
                ))}
              </Swiper>
            );
          },
        });
        await vi.advanceTimersByTimeAsync(200);
        // v-model 双向绑定：切换后同步到父组件
        expect(current.value).toBe(1);
        expect(wrapper.findComponent(Swiper).emitted('update:modelValue')).toEqual([[1]]);
      } finally {
        vi.useRealTimers();
      }
    });

    it('defaultCurrent[number]', async () => {
      const wrapper = mountSwiper({ defaultCurrent: 1 });
      await flush();
      // 非受控初始值：初始渲染时第 defaultCurrent 项为激活态
      expect(getDots(wrapper)).toHaveLength(images.length);
      expect(getActiveDotIndex(wrapper)).toBe(1);
    });

    it('direction[horizontal/vertical]', async () => {
      const horizontal = mountSwiper();
      await flush();
      expect(getContainer(horizontal).attributes('style')).toContain('flex-direction: row');
      expect(horizontal.find(`.${navClassPrefix}--horizontal`).exists()).toBe(true);

      const vertical = mountSwiper({ direction: 'vertical', navigation: { type: 'dots', showControls: true } });
      await flush();
      expect(getContainer(vertical).attributes('style')).toContain('flex-direction: column');
      expect(vertical.find(`.${navClassPrefix}--vertical`).exists()).toBe(true);
      // 垂直方向不渲染两侧控制按钮
      expect(vertical.find(`.${navClassPrefix}__btn`).exists()).toBe(false);
    });

    it('duration[number]', async () => {
      const wrapper = mountSwiper({ duration: 100, loop: true });
      const $container = getContainer(wrapper);
      await flush();
      await swipeBy($container, 200, 50);
      // 切换动画使用 duration 作为过渡时长
      expect($container.attributes('style')).toContain('transition: transform 100ms');
    });

    it('height[number]', async () => {
      const wrapper = mountSwiper({ height: 200 });
      await flush();
      expect(getContainer(wrapper).attributes('style')).toContain('height: 200px');
    });

    it('height[string]', async () => {
      const wrapper = mountSwiper({ height: '10rem' });
      await flush();
      expect(getContainer(wrapper).attributes('style')).toContain('height: 10rem');
    });

    it('interval[number]', async () => {
      vi.useFakeTimers();
      try {
        const mountAutoplay = (interval: number, onChange: ReturnType<typeof vi.fn>) =>
          mount({
            setup() {
              return () => (
                <Swiper autoplay interval={interval} onChange={onChange}>
                  {images.map((image) => (
                    <SwiperItem key={image}>
                      <img src={image} />
                    </SwiperItem>
                  ))}
                </Swiper>
              );
            },
          });
        const onChange = vi.fn();
        const onChangeSlow = vi.fn();
        mountAutoplay(200, onChange);
        mountAutoplay(500, onChangeSlow);
        await vi.advanceTimersByTimeAsync(199);
        expect(onChange).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(1);
        expect(onChange).toHaveBeenCalledTimes(1); // interval=200 到点切换
        expect(onChangeSlow).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(300);
        expect(onChangeSlow).toHaveBeenCalledTimes(1); // interval=500 到点切换
      } finally {
        vi.useRealTimers();
      }
    });

    it('loop[boolean]', async () => {
      vi.useFakeTimers();
      try {
        const mountAutoplay = (loop: boolean, onChange: ReturnType<typeof vi.fn>) => {
          const current = ref(0);
          const wrapper = mount({
            setup() {
              return () => (
                <Swiper v-model={current.value} autoplay loop={loop} interval={100} onChange={onChange}>
                  {images.map((image) => (
                    <SwiperItem key={image}>
                      <img src={image} />
                    </SwiperItem>
                  ))}
                </Swiper>
              );
            },
          });
          return { current, wrapper };
        };

        // 循环模式（默认）：最后一页后回到第一页 0 -> 1 -> 2 -> 0
        const onChange = vi.fn();
        const { current } = mountAutoplay(true, onChange);
        await vi.advanceTimersByTimeAsync(300);
        expect(onChange).toHaveBeenCalledTimes(3);
        expect(onChange.mock.calls.map(([index]) => index)).toEqual([1, 2, 0]);
        expect(current.value).toBe(0);

        // 非循环模式：到达最后一页后停止切换
        const onChangeStopped = vi.fn();
        const { current: currentStopped } = mountAutoplay(false, onChangeStopped);
        await vi.advanceTimersByTimeAsync(300);
        expect(onChangeStopped).toHaveBeenCalledTimes(2);
        expect(onChangeStopped).toHaveBeenLastCalledWith(images.length - 1, { source: 'autoplay' });
        expect(currentStopped.value).toBe(images.length - 1);
      } finally {
        vi.useRealTimers();
      }
    });

    it('navigation[boolean]', async () => {
      const shown = mountSwiper({ navigation: true });
      await flush();
      expect(shown.find(`.${navClassPrefix}__dots`).exists()).toBe(true);

      // navigation = false 时不渲染任何导航器
      const hidden = mountSwiper({ navigation: false });
      await flush();
      expect(hidden.find(`.${navClassPrefix}__dots`).exists()).toBe(false);
      expect(hidden.findAll(`.${navClassPrefix}__dots-item`)).toHaveLength(0);
      expect(hidden.find(`.${classPrefix}__container`).exists()).toBe(true);
    });

    it('navigation[object]', async () => {
      // 传入空对象时与默认配置合并：type=dots / paginationPosition=bottom / placement=inside / showControls=false
      const merged = mountSwiper({ navigation: {} });
      await flush();
      const $nav = merged.find(`.${navClassPrefix}__dots`);
      expect($nav.classes()).toContain(`${navClassPrefix}--bottom`);
      expect($nav.classes()).toContain(`${navClassPrefix}--inside`);
      expect(merged.find(`.${navClassPrefix}__btn`).exists()).toBe(false);
      expect(getDots(merged)).toHaveLength(images.length);
      expect(getActiveDotIndex(merged)).toBe(0);

      // type=dots-bar 渲染点条状导航
      const bar = mountSwiper({ navigation: { type: 'dots-bar' } });
      await flush();
      expect(bar.findAll(`.${navClassPrefix}__dots-bar-item`)).toHaveLength(images.length);

      // type=fraction 渲染分式导航「当前/总数」
      const fraction = mountSwiper({ navigation: { type: 'fraction' } });
      await flush();
      expect(fraction.find(`.${navClassPrefix}__fraction`).text()).toBe(`1/${images.length}`);

      // paginationPosition 全枚举均落到导航器类名上
      const positions: NonNullable<SwiperNavigation['paginationPosition']>[] = [
        'top-left',
        'top',
        'top-right',
        'bottom-left',
        'bottom',
        'bottom-right',
        'left',
        'right',
      ];
      await Promise.all(
        positions.map(async (paginationPosition) => {
          const positioned = mountSwiper({ navigation: { paginationPosition } });
          await flush();
          expect(positioned.find(`.${navClassPrefix}--${paginationPosition}`).exists(), paginationPosition).toBe(true);
        }),
      );

      // placement 决定导航器位于主体内侧或外侧，底部分页时同步到根类名
      const outside = mountSwiper({ navigation: { placement: 'outside' } });
      await flush();
      expect(outside.find(`.${navClassPrefix}--outside`).exists()).toBe(true);
      expect(outside.find(`.${classPrefix}`).classes()).toContain(`${classPrefix}--outside`);
    });

    it('navigation[function]', async () => {
      const wrapper = mountSwiper({ navigation: () => <div class="custom-nav">custom</div> });
      await flush();
      expect(wrapper.find('.custom-nav').text()).toBe('custom');
      expect(wrapper.find(`.${navClassPrefix}__dots`).exists()).toBe(false);
    });

    it('navigation[minShowNum]', async () => {
      // 数量未达到 minShowNum 时不显示导航器
      const hidden = mountSwiper({ navigation: { minShowNum: images.length + 1 } });
      await flush();
      expect(hidden.find(`.${navClassPrefix}__dots`).exists()).toBe(false);

      // 数量达到 minShowNum 时正常显示
      const shown = mountSwiper({ navigation: { minShowNum: images.length } });
      await flush();
      expect(shown.find(`.${navClassPrefix}__dots`).exists()).toBe(true);
    });

    it('navigation[showControls]', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({ navigation: { showControls: true }, defaultCurrent: 1, onChange });
      await flush();
      expect(wrapper.find(`.${navClassPrefix}__btn`).exists()).toBe(true);

      // 点击上一页按钮切换到前一项
      await wrapper.find(`.${navClassPrefix}__btn--prev`).trigger('click');
      expect(onChange).toHaveBeenCalledWith(0, { source: 'nav' });
      expect(getActiveDotIndex(wrapper)).toBe(0);

      // 点击下一页按钮切换到后一项
      await wrapper.find(`.${navClassPrefix}__btn--next`).trigger('click');
      expect(onChange).toHaveBeenLastCalledWith(1, { source: 'nav' });
      expect(getActiveDotIndex(wrapper)).toBe(1);
    });

    // nextMargin 标注【开发中】，组件源码未消费该属性，无差异可断言
    it.todo('nextMargin[number]');
    it.todo('nextMargin[string]');

    // previousMargin 标注【开发中】，组件源码未消费该属性，无差异可断言
    it.todo('previousMargin[number]');
    it.todo('previousMargin[string]');

    // disabled 在 swiper.tsx 中内部声明，未收录进 props.ts，置于分组末尾
    it('disabled[boolean]', async () => {
      const onChange = vi.fn();
      const disabled = mountSwiper({ disabled: true, loop: true, onChange });
      await flush();
      await swipeBy(getContainer(disabled), 200, 50);
      expect(onChange).not.toHaveBeenCalled();

      const onChangeEnabled = vi.fn();
      const enabled = mountSwiper({ loop: true, onChange: onChangeEnabled });
      await flush();
      await swipeBy(getContainer(enabled), 200, 50);
      expect(onChangeEnabled).toHaveBeenCalledWith(1, { source: 'touch' });
    });
  });

  describe('events', () => {
    it('change', async () => {
      const onChange = vi.fn();
      const wrapper = mountSwiper({
        defaultCurrent: 1,
        loop: false,
        navigation: { showControls: true },
        onChange,
      });
      await flush();
      await wrapper.find(`.${navClassPrefix}__btn--next`).trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(2, { source: 'nav' });

      // 非循环模式已到最后一页，继续点击下一页不再触发
      await wrapper.find(`.${navClassPrefix}__btn--next`).trigger('click');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('click', async () => {
      const onClick = vi.fn();
      const wrapper = mountSwiper({ defaultCurrent: 1, onClick });
      await flush();
      await getContainer(wrapper).trigger('click');
      // 点击轮播项时回调参数为当前项下标
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(1);
    });

    it('transitionenter', async () => {
      const wrapper = mountSwiper();
      await flush();
      await trigger(getContainer(wrapper), 'transitionstart', 0, 0);
      expect(wrapper.findComponent(Swiper).emitted('transitionenter')).toHaveLength(1);
    });

    it('transitionleave', async () => {
      const wrapper = mountSwiper({ duration: 100, loop: true });
      const $container = getContainer(wrapper);
      await flush();
      await swipeBy($container, 200, 50);
      expect($container.attributes('style')).toContain('transition: transform 100ms');
      await finishTransition($container);
      expect(wrapper.findComponent(Swiper).emitted('transitionleave')).toHaveLength(1);
      // transitionend 后复位位移并结束过渡
      expect($container.attributes('style')).toContain('transition: none');
      expect($container.attributes('style')).toContain('transform: translateX(0');
    });
  });

  describe('slots', () => {
    it('default', async () => {
      const wrapper = mountSwiper();
      await flush();
      const $items = wrapper.findAll(`.${classPrefix}-item`);
      expect($items).toHaveLength(images.length);
      expect($items[0].find('img').attributes('src')).toBe(images[0]);
    });

    it('navigation', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper navigation={null} autoplay={false}>
              {{
                default: () =>
                  images.map((image) => (
                    <SwiperItem key={image}>
                      <img src={image} />
                    </SwiperItem>
                  )),
                navigation: () => <div class="custom-navigation">navigation</div>,
              }}
            </Swiper>
          );
        },
      });
      await flush();
      expect(wrapper.find('.custom-navigation').text()).toBe('navigation');
    });
  });

  describe('instanceFunctions', () => {
    it('swipeTo', async () => {
      const swiperRef = ref<{ swipeTo: (index: number, options?: { immediate?: boolean }) => void }>();
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper ref={swiperRef} autoplay={false} onChange={onChange}>
              {images.map((image) => (
                <SwiperItem key={image}>
                  <img src={image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      await flush();

      // 切换到指定下标
      swiperRef.value.swipeTo(2);
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(2, { source: 'autoplay' });
      expect(getActiveDotIndex(wrapper)).toBe(2);

      // 越界下标与当前下标不生效
      swiperRef.value.swipeTo(images.length);
      swiperRef.value.swipeTo(-1);
      swiperRef.value.swipeTo(2);
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(1);

      // immediate 立即切换，不经过动画流程
      swiperRef.value.swipeTo(1, { immediate: true });
      await nextTick();
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith(1, { source: 'autoplay' });
      expect(getActiveDotIndex(wrapper)).toBe(1);
    });
  });

  describe('scenarios', () => {
    describe('touch swipe', () => {
      it('horizontal loop swipe cycles through items', async () => {
        const onChange = vi.fn();
        const wrapper = mountSwiper({ loop: true, onChange });
        const $container = getContainer(wrapper);
        await flush();

        // 向左滑切换到下一项
        await swipeBy($container, 200, 50);
        expect(onChange).toHaveBeenLastCalledWith(1, { source: 'touch' });
        await finishTransition($container);

        // 向右滑切换到上一项
        await swipeBy($container, 50, 200);
        expect(onChange).toHaveBeenLastCalledWith(0, { source: 'touch' });
        await finishTransition($container);

        // 首页继续向右滑，循环回到最后一项
        await swipeBy($container, 50, 200);
        expect(onChange).toHaveBeenLastCalledWith(images.length - 1, { source: 'touch' });
        expect(getActiveDotIndex(wrapper)).toBe(images.length - 1);
      });

      it('vertical swipe switches items on Y axis', async () => {
        const onChange = vi.fn();
        const wrapper = mountSwiper({ direction: 'vertical', loop: true, onChange });
        await flush();
        await swipeBy(getContainer(wrapper), 200, 50, 'y');
        expect(onChange).toHaveBeenLastCalledWith(1, { source: 'touch' });
      });

      it('non-loop swipe stops at boundaries', async () => {
        const onChange = vi.fn();
        const wrapper = mountSwiper({ loop: false, defaultCurrent: images.length - 1, onChange });
        const $container = getContainer(wrapper);
        await flush();

        // 最后一页继续向左滑（下一张）不触发切换
        await swipeBy($container, 200, 50);
        expect(onChange).not.toHaveBeenCalled();

        // 向右滑（上一张）正常切换
        await swipeBy($container, 50, 200);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(images.length - 2, { source: 'touch' });
      });

      it('swipe below threshold resets position', async () => {
        const onChange = vi.fn();
        const wrapper = mountSwiper({ loop: true, onChange });
        const $container = getContainer(wrapper);
        await flush();

        // 位移超过滑动检测阈值(50px)但未达翻页阈值(100px)：回到原位且索引不变
        await swipeBy($container, 0, 80);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenLastCalledWith(0, { source: 'touch' });
        expect(getActiveDotIndex(wrapper)).toBe(0);

        // 位移低于滑动检测阈值：不产生任何交互
        const onChangeQuiet = vi.fn();
        const quiet = mountSwiper({ loop: true, onChange: onChangeQuiet });
        await flush();
        await swipeBy(getContainer(quiet), 0, 30);
        expect(onChangeQuiet).not.toHaveBeenCalled();
      });
    });

    describe('autoplay lifecycle', () => {
      it('pauses autoplay during touch and resumes after release', async () => {
        vi.useFakeTimers();
        try {
          const onChange = vi.fn();
          const wrapper = mount({
            setup() {
              return () => (
                <Swiper autoplay interval={100} onChange={onChange}>
                  {images.map((image) => (
                    <SwiperItem key={image}>
                      <img src={image} />
                    </SwiperItem>
                  ))}
                </Swiper>
              );
            },
          });
          const $container = getContainer(wrapper);
          await vi.advanceTimersByTimeAsync(100);
          expect(onChange).toHaveBeenCalledTimes(1); // 0 -> 1

          // 结束动画锁定后按下不放，触摸期间自动播放暂停
          await finishTransition($container);
          await trigger($container, 'touchstart', 0, 0);
          await vi.advanceTimersByTimeAsync(500);
          expect(onChange).toHaveBeenCalledTimes(1);

          // 松手完成一次向右滑动（上一张）后自动播放恢复
          await trigger($container, 'touchmove', 101, 0);
          await trigger($container, 'touchend', 101, 0);
          expect(onChange).toHaveBeenCalledTimes(2); // 1 -> 0（触摸切换）
          await vi.advanceTimersByTimeAsync(100);
          expect(onChange).toHaveBeenCalledTimes(3); // 0 -> 1（自动播放恢复）
          expect(onChange).toHaveBeenLastCalledWith(1, { source: 'autoplay' });
        } finally {
          vi.useRealTimers();
        }
      });
    });

    describe('item registration', () => {
      const mountDynamic = (initial: string[], props: Record<string, any> = {}) => {
        const items = ref([...initial]);
        const wrapper = mount({
          setup() {
            return () => (
              <Swiper autoplay={false} {...props}>
                {items.value.map((image) => (
                  <SwiperItem key={image}>
                    <img src={image} />
                  </SwiperItem>
                ))}
              </Swiper>
            );
          },
        });
        return { items, wrapper };
      };

      it('removing an earlier item keeps content and shifts index', async () => {
        const { items, wrapper } = mountDynamic(images, { defaultCurrent: 1 });
        await flush();
        expect(getActiveDotIndex(wrapper)).toBe(1);

        items.value.splice(0, 1);
        await flush();
        // 删除前一项后总数减少，当前索引前移一位以保持显示相同内容
        expect(getDots(wrapper)).toHaveLength(images.length - 1);
        expect(getActiveDotIndex(wrapper)).toBe(0);
      });

      it('removing the last visible item clamps index to the new last item', async () => {
        const { items, wrapper } = mountDynamic(images, { defaultCurrent: images.length - 1 });
        await flush();
        items.value.splice(images.length - 1, 1);
        await flush();
        expect(getDots(wrapper)).toHaveLength(images.length - 1);
        expect(getActiveDotIndex(wrapper)).toBe(images.length - 2);
      });

      it('removing all items resets index', async () => {
        const { items, wrapper } = mountDynamic(images);
        await flush();
        items.value.splice(0, items.value.length);
        await flush();
        expect(getDots(wrapper)).toHaveLength(0);
      });

      it('appending an item registers it to the swiper', async () => {
        const { items, wrapper } = mountDynamic(images.slice(0, 2));
        await flush();
        expect(getDots(wrapper)).toHaveLength(2);
        items.value.push('swiper-04.png');
        await flush();
        expect(getDots(wrapper)).toHaveLength(3);
      });
    });

    describe('two items loop', () => {
      it('cycles between the two items continuously', async () => {
        vi.useFakeTimers();
        try {
          const current = ref(0);
          const onChange = vi.fn();
          mount({
            setup() {
              return () => (
                <Swiper v-model={current.value} autoplay interval={100} onChange={onChange}>
                  {images.slice(0, 2).map((image) => (
                    <SwiperItem key={image}>
                      <img src={image} />
                    </SwiperItem>
                  ))}
                </Swiper>
              );
            },
          });
          await vi.advanceTimersByTimeAsync(300);
          // 仅 2 项时循环往返切换：0 -> 1 -> 0 -> 1
          expect(onChange).toHaveBeenCalledTimes(3);
          expect(onChange.mock.calls.map(([index]) => index)).toEqual([1, 0, 1]);
          expect(current.value).toBe(1);
        } finally {
          vi.useRealTimers();
        }
      });
    });

    describe('height measurement', () => {
      it('derives container height from the active item when height is unset', async () => {
        const restore = mockElementSize({ width: 320, height: 120 });
        try {
          const wrapper = mountSwiper();
          await flush();
          expect(getContainer(wrapper).attributes('style')).toContain('height: 120px');
        } finally {
          restore();
        }
      });
    });

    describe('navigation priority', () => {
      it('navigation function takes precedence over navigation slot', async () => {
        const wrapper = mount({
          setup() {
            return () => (
              <Swiper navigation={() => <div class="prop-nav">prop</div>} autoplay={false}>
                {{
                  default: () =>
                    images.map((image) => (
                      <SwiperItem key={image}>
                        <img src={image} />
                      </SwiperItem>
                    )),
                  navigation: () => <div class="slot-nav">slot</div>,
                }}
              </Swiper>
            );
          },
        });
        await flush();
        expect(wrapper.find('.prop-nav').exists()).toBe(true);
        expect(wrapper.find('.slot-nav').exists()).toBe(false);
      });

      it('builtin navigation takes precedence over navigation slot', async () => {
        const wrapper = mount({
          setup() {
            return () => (
              <Swiper navigation={{ type: 'dots' }} autoplay={false}>
                {{
                  default: () =>
                    images.map((image) => (
                      <SwiperItem key={image}>
                        <img src={image} />
                      </SwiperItem>
                    )),
                  navigation: () => <div class="slot-nav">slot</div>,
                }}
              </Swiper>
            );
          },
        });
        await flush();
        expect(wrapper.find(`.${navClassPrefix}__dots`).exists()).toBe(true);
        expect(wrapper.find('.slot-nav').exists()).toBe(false);
      });
    });
  });
});
