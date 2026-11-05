import { afterEach, describe, expect, it, vi } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import Swiper from '../swiper';
import SwiperItem from '../swiper-item';
import { flush } from '@/test/flush';

enableAutoUnmount(afterEach);

afterEach(() => {
  vi.restoreAllMocks();
});

const itemClassPrefix = 't-swiper-item';

describe('SwiperItem', () => {
  describe('props', () => {
    it('default[slot]', async () => {
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
});
