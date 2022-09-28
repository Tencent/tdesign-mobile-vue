import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import Sticky from '../sticky.vue';
import { useTestUtils, useVitest } from '../../shared';

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

/**
 * 创建sticky测试用容器
 */
const stickyRectMock = (wrapper, { stickyMockReturnValue, documentMockReturnValue }) => {
  const { getBoundingClientRect } = useVitest(vi);
  const mockStickyRect = getBoundingClientRect(wrapper.find('.t-sticky').element).mockReturnValue(
    stickyMockReturnValue,
  );

  const mockDocumentRect = getBoundingClientRect(document.documentElement).mockReturnValue(documentMockReturnValue);

  const mockStickyRectRestore = mockStickyRect.mockRestore;
  const mockDocumentRectRestore = mockDocumentRect.mockRestore;

  const mockRestore = () => {
    mockStickyRectRestore();
    mockDocumentRectRestore();
  };

  return { mockStickyRect, mockDocumentRect, mockStickyRectRestore, mockDocumentRectRestore, mockRestore };
};

describe('sticky', () => {
  describe('props', () => {
    it(': offsetTop', async () => {
      const { makeScroll } = useTestUtils();
      const wrapper = _mount(`
        <Sticky :offsetTop="30">${TRUTH}</Sticky>
      `);

      await nextTick();
      const { mockRestore } = stickyRectMock(wrapper, {
        stickyMockReturnValue: {
          height: 40,
          width: 1000,
          top: 29,
        },
        documentMockReturnValue: {
          height: 200,
          width: 1000,
          top: 0,
          bottom: 200,
        },
      });

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 99;');
      await makeScroll(document.documentElement, 'scrollTop', 200);

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain(
        'z-index: 99; position: fixed; top: 30px;',
      );

      mockRestore();
    });

    it(': z-index', async () => {
      const { makeScroll } = useTestUtils();
      const wrapper = _mount(`
        <Sticky :zIndex="1000" :offsetTop="30">${TRUTH}</Sticky>
      `);

      await nextTick();
      const { mockRestore } = stickyRectMock(wrapper, {
        stickyMockReturnValue: {
          height: 40,
          width: 1000,
          top: 29,
        },
        documentMockReturnValue: {
          height: 200,
          width: 1000,
          top: 0,
          bottom: 200,
        },
      });

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 1000;');
      await makeScroll(document.documentElement, 'scrollTop', 300);
      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain(
        'z-index: 1000; position: fixed; top: 30px;',
      );
      mockRestore();
    });

    it(': onScroll', async () => {
      const { makeScroll, sleep } = useTestUtils();
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

      const { mockRestore } = stickyRectMock(wrapper, {
        stickyMockReturnValue: {
          height: 40,
          width: 1000,
          top: 30,
        },
        documentMockReturnValue: {
          height: 200,
          width: 1000,
          top: 0,
          bottom: 200,
        },
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
      mockRestore();

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
      mockRestore();
    });
  });

  describe('event', () => {
    it(': onScroll', async () => {
      const { makeScroll, sleep } = useTestUtils();
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

      const { mockRestore } = stickyRectMock(wrapper, {
        stickyMockReturnValue: {
          height: 40,
          width: 1000,
          top: 30,
        },
        documentMockReturnValue: {
          height: 200,
          width: 1000,
          top: 0,
          bottom: 200,
        },
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
      mockRestore();

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
      mockRestore();
    });
  });
});
