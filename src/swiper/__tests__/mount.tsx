import { nextTick } from 'vue';
import { vi } from 'vitest';
import { mount } from '@vue/test-utils';
import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { trigger } from '@/test/touch';
import Swiper from '../swiper';
import SwiperItem from '../swiper-item';
import type { TdSwiperProps } from '../type';

export const classPrefix = 't-swiper';
export const navClassPrefix = 't-swiper-nav';
export const images = ['swiper-01.png', 'swiper-02.png', 'swiper-03.png'];

export type SwiperMountProps = TdSwiperProps & { disabled?: boolean };

/** 挂载一个包含若干 SwiperItem 的 Swiper */
export const mountSwiper = (props: SwiperMountProps = {}, items: string[] = images) =>
  mount({
    setup() {
      return () => (
        <Swiper autoplay={false} {...props}>
          {items.map((image) => (
            <SwiperItem key={image}>
              <img src={image} />
            </SwiperItem>
          ))}
        </Swiper>
      );
    },
  });

/** 轮播容器（触摸与点击事件的目标元素） */
export const getContainer = (wrapper: VueWrapper<any>) => wrapper.find(`.${classPrefix}__container`);

/** 底部导航圆点 */
export const getDots = (wrapper: VueWrapper<any>) => wrapper.findAll(`.${navClassPrefix}__dots-item`);

/** 当前激活圆点的下标 */
export const getActiveDotIndex = (wrapper: VueWrapper<any>) =>
  getDots(wrapper).findIndex((dot) => dot.classes().includes(`${navClassPrefix}__dots-item--active`));

/** 模拟一次滑动手势：start → end 为滑动轴上的起止坐标 */
export async function swipeBy(container: DOMWrapper<Element>, start: number, end: number, axis: 'x' | 'y' = 'x') {
  await nextTick(); // 确保 useSwipe 通过 post-flush watcher 挂载的触摸监听已生效
  const [startX, startY] = axis === 'x' ? [start, 0] : [0, start];
  const [endX, endY] = axis === 'x' ? [end, 0] : [0, end];
  await trigger(container, 'touchstart', startX, startY);
  await trigger(container, 'touchmove', endX, endY);
  await trigger(container, 'touchend', endX, endY);
}

/** 模拟 transitionend：结束动画、复位位移并解除滑动锁定 */
export const finishTransition = (container: DOMWrapper<Element>) => trigger(container, 'transitionend', 0, 0);

/**
 * jsdom 不执行布局，offsetWidth/offsetHeight/getBoundingClientRect 均返回 0；
 * 通过 mock 根元素尺寸让 item 位移与容器高度可精确断言。返回还原函数。
 */
export function mockElementSize({ width, height }: { width: number; height: number }) {
  const proto = HTMLElement.prototype as any;
  const keys = ['offsetWidth', 'offsetHeight'] as const;
  const originals = keys.map((key) => ({ key, descriptor: Object.getOwnPropertyDescriptor(proto, key) }));
  Object.defineProperty(proto, 'offsetWidth', { configurable: true, get: () => width });
  Object.defineProperty(proto, 'offsetHeight', { configurable: true, get: () => height });
  const rectSpy = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
    width,
    height,
    top: 0,
    left: 0,
    bottom: height,
    right: width,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect);
  return () => {
    rectSpy.mockRestore();
    originals.forEach(({ key, descriptor }) => {
      if (descriptor) Object.defineProperty(proto, key, descriptor);
      else delete proto[key];
    });
  };
}
