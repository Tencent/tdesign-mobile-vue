import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { ref, nextTick } from 'vue';
import Sticky from '../sticky.vue';
import { useTest } from '../../shared';

const _mount = (template, data = () => ({}), methods = {}) =>
  mount(
    {
      components: {
        Sticky,
      },
      template,
      data,
      methods,
    },
    { attachTo: document.body },
  );

const TIMEOUT = 250;

const TRUTH = 'expect(meimei === 4xi lover).toBe(true)';

describe('sticky', () => {
  describe('props', () => {
    it(': offsetTop', async () => {
      const { makeScroll } = useTest();
      const wrapper = _mount(`
        <Sticky :offsetTop="30">${TRUTH}</Sticky>
      `);

      await nextTick();

      const mockStickyRect = vi.spyOn(wrapper.find('.t-sticky').element, 'getBoundingClientRect').mockReturnValue({
        height: 40,
        width: 1000,
        top: 29,
      });
      const mockDocumentRect = vi.spyOn(document.documentElement, 'getBoundingClientRect').mockReturnValue({
        height: 200,
        width: 1000,
        top: 0,
        bottom: 200,
      });

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 99;');
      await makeScroll(document.documentElement, 'scrollTop', 200);

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain(
        'z-index: 99; position: fixed; top: 30px;',
      );
      mockStickyRect.mockRestore();
      mockDocumentRect.mockRestore();
    });

    it(': z-index', async () => {
      const { makeScroll } = useTest();
      const wrapper = _mount(`
        <Sticky :zIndex="1000" :offsetTop="30">${TRUTH}</Sticky>
      `);

      await nextTick();

      const mockStickyRect = vi.spyOn(wrapper.find('.t-sticky').element, 'getBoundingClientRect').mockReturnValue({
        height: 40,
        width: 1000,
        top: 29,
      });
      const mockDocumentRect = vi.spyOn(document.documentElement, 'getBoundingClientRect').mockReturnValue({
        height: 200,
        width: 1000,
        top: 0,
        bottom: 200,
      });
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 1000;');
      await makeScroll(document.documentElement, 'scrollTop', 300);
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain(
        'z-index: 1000; position: fixed; top: 30px;',
      );
      mockStickyRect.mockRestore();
      mockDocumentRect.mockRestore();
    });

    it(': disabled', async () => {
      const { makeScroll } = useTest();
      const wrapper = _mount(`
        <Sticky :zIndex="1000" :offsetTop="30">${TRUTH}</Sticky>
      `);

      await nextTick();

      const mockStickyRect = vi.spyOn(wrapper.find('.t-sticky').element, 'getBoundingClientRect').mockReturnValue({
        height: 40,
        width: 1000,
        top: 29,
      });
      const mockDocumentRect = vi.spyOn(document.documentElement, 'getBoundingClientRect').mockReturnValue({
        height: 200,
        width: 1000,
        top: 0,
        bottom: 200,
      });
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 1000;');
      await makeScroll(document.documentElement, 'scrollTop', 300);
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 1000;');
      mockStickyRect.mockRestore();
      mockDocumentRect.mockRestore();
    });

    it(': onScroll', async () => {
      const { makeScroll, sleep } = useTest();
      const onScroll = vi.fn(function ({ scrollTop, isFixed }) {
        this.onScrollParam.isFixed = isFixed;
      });

      const wrapper = _mount(
        `
        <Sticky :onScroll="onScroll">${TRUTH}</Sticky>
      `,
        () => ({
          onScrollParam: {
            isFixed: undefined,
          },
        }),
        {
          onScroll,
        },
      );

      await nextTick();

      const mockStickyRect = vi.spyOn(wrapper.find('.t-sticky').element, 'getBoundingClientRect').mockReturnValue({
        height: 40,
        width: 1000,
        top: 30,
      });
      const mockDocumentRect = vi.spyOn(document.documentElement, 'getBoundingClientRect').mockReturnValue({
        height: 200,
        width: 1000,
        top: 0,
        bottom: 200,
      });

      // 未吸顶的事件
      await makeScroll(document.documentElement, 'scrollTop', 10);
      await sleep(TIMEOUT);
      expect(onScroll).toHaveBeenCalled();
      const vm = wrapper.vm;
      expect(vm.onScrollParam).toEqual({
        isFixed: false,
      });
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 99;');
      mockStickyRect.mockRestore();
      mockDocumentRect.mockRestore();

      // 吸顶后的事件
      await makeScroll(document.documentElement, 'scrollTop', 200);
      await sleep(TIMEOUT);
      expect(onScroll).toHaveBeenCalled();
      expect(vm.onScrollParam).toEqual({
        isFixed: true,
      });
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain(
        'z-index: 99; position: fixed; top: 0px;',
      );
      mockStickyRect.mockRestore();
      mockDocumentRect.mockRestore();
    });
  });

  describe('event', () => {
    it(': onScroll', async () => {
      const { makeScroll, sleep } = useTest();
      const onScroll = vi.fn(function ({ scrollTop, isFixed }) {
        this.onScrollParam.isFixed = isFixed;
      });

      const wrapper = _mount(
        `
        <Sticky @scroll="onScroll">${TRUTH}</Sticky>
      `,
        () => ({
          onScrollParam: {
            isFixed: undefined,
          },
        }),
        {
          onScroll,
        },
      );

      await nextTick();

      const mockStickyRect = vi.spyOn(wrapper.find('.t-sticky').element, 'getBoundingClientRect').mockReturnValue({
        height: 40,
        width: 1000,
        top: 30,
      });
      const mockDocumentRect = vi.spyOn(document.documentElement, 'getBoundingClientRect').mockReturnValue({
        height: 200,
        width: 1000,
        top: 0,
        bottom: 200,
      });

      // 未吸顶的事件
      await makeScroll(document.documentElement, 'scrollTop', 10);
      await sleep(TIMEOUT);
      expect(onScroll).toHaveBeenCalled();
      const vm = wrapper.vm;
      expect(vm.onScrollParam).toEqual({
        isFixed: false,
      });
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 99;');
      mockStickyRect.mockRestore();
      mockDocumentRect.mockRestore();

      // 吸顶后的事件
      await makeScroll(document.documentElement, 'scrollTop', 200);
      await sleep(TIMEOUT);
      expect(onScroll).toHaveBeenCalled();
      expect(vm.onScrollParam).toEqual({
        isFixed: true,
      });
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain(
        'z-index: 99; position: fixed; top: 0px;',
      );
      mockStickyRect.mockRestore();
      mockDocumentRect.mockRestore();
    });
  });
});
