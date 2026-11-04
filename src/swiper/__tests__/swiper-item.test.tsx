import { afterEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import { ref } from 'vue';
import Swiper from '../swiper';
import SwiperItem from '../swiper-item';
import type { TdSwiperProps } from '../type';
import { flush, getDots, images, mockElementSize } from './mount';

enableAutoUnmount(afterEach);

afterEach(() => {
  vi.restoreAllMocks();
});

const itemClassPrefix = 't-swiper-item';

const mountWithItems = (props: TdSwiperProps = {}, items: string[] = images) =>
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

const getItemStyles = (wrapper: ReturnType<typeof mountWithItems>) =>
  wrapper.findAll(`.${itemClassPrefix}`).map((item) => item.attributes('style') ?? '');

describe('SwiperItem', () => {
  describe('slots', () => {
    it('default', async () => {
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper autoplay={false}>
              <SwiperItem>
                <div class="item-content">first</div>
              </SwiperItem>
            </Swiper>
          );
        },
      });
      await flush();
      const $item = wrapper.find(`.${itemClassPrefix}`);
      expect($item.exists()).toBe(true);
      expect($item.find('.item-content').text()).toBe('first');
    });
  });

  describe('scenarios', () => {
    it('registers itself to the parent swiper on mount', async () => {
      const wrapper = mountWithItems();
      await flush();
      // 导航圆点数量与挂载的 SwiperItem 数量一致
      expect(wrapper.findAll(`.${itemClassPrefix}`)).toHaveLength(images.length);
      expect(getDots(wrapper)).toHaveLength(images.length);
    });

    it('unregisters from the parent swiper on unmount', async () => {
      const items = ref([...images]);
      const wrapper = mount({
        setup() {
          return () => (
            <Swiper autoplay={false}>
              {items.value.map((image) => (
                <SwiperItem key={image}>
                  <img src={image} />
                </SwiperItem>
              ))}
            </Swiper>
          );
        },
      });
      await flush();
      expect(getDots(wrapper)).toHaveLength(images.length);

      items.value.splice(1, 1);
      await flush();
      expect(wrapper.findAll(`.${itemClassPrefix}`)).toHaveLength(images.length - 1);
      expect(getDots(wrapper)).toHaveLength(images.length - 1);
    });

    it('offsets siblings horizontally by swiper width', async () => {
      const restore = mockElementSize({ width: 320, height: 120 });
      try {
        const wrapper = mountWithItems({ loop: false });
        await flush();
        // 非循环模式：当前项(下标 0)不动，后续项依次向右偏移一个宽度
        const styles = getItemStyles(wrapper);
        expect(styles[0]).toContain('translateX(0px)');
        expect(styles[1]).toContain('translateX(320px)');
        expect(styles[2]).toContain('translateX(640px)');
      } finally {
        restore();
      }
    });

    it('wraps the last item before the first one in loop mode', async () => {
      const restore = mockElementSize({ width: 320, height: 120 });
      try {
        const wrapper = mountWithItems({ loop: true });
        await flush();
        // 循环模式：首屏为第一项时，最后一项被挪到第一项左侧以便向后循环
        const styles = getItemStyles(wrapper);
        expect(styles[0]).toContain('translateX(0px)');
        expect(styles[1]).toContain('translateX(320px)');
        expect(styles[2]).toContain('translateX(-320px)');
      } finally {
        restore();
      }
    });

    it('offsets siblings vertically in vertical direction', async () => {
      const restore = mockElementSize({ width: 320, height: 400 });
      try {
        const wrapper = mountWithItems({ direction: 'vertical', loop: true });
        await flush();
        const styles = getItemStyles(wrapper);
        expect(styles[0]).toContain('translateY(0px)');
        expect(styles[1]).toContain('translateY(400px)');
        expect(styles[2]).toContain('translateY(-400px)');
      } finally {
        restore();
      }
    });
  });
});
