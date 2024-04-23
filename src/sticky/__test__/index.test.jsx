import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { nextTick } from 'vue';
import Sticky from '../sticky';
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
        <Sticky :offsetTop="30"></Sticky>
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
        <Sticky :zIndex="1000" :offsetTop="30"></Sticky>
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
      const onScrollParameterFn = vi.fn((isFixed) => {});
      const onScroll = ({ isFixed }) => onScrollParameterFn(isFixed);
      const wrapper = _mount(
        `
        <Sticky :onScroll="onScroll"></Sticky>
      `,
        () => ({}),
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

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 99;');
      mockRestore();
      expect(onScrollParameterFn).toHaveBeenCalledWith(false);

      // 吸顶后的事件
      await makeScroll(document.documentElement, 'scrollTop', 200);
      await sleep(TIMEOUT);

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain(
        'z-index: 99; position: fixed; top: 0px;',
      );
      mockRestore();
      expect(onScrollParameterFn).toHaveBeenCalledWith(true);
    });
  });

  describe('event', () => {
    it(': onScroll', async () => {
      const { makeScroll, sleep } = useTestUtils();
      const onScrollParameterFn = vi.fn((isFixed) => {});
      const onScroll = ({ isFixed }) => onScrollParameterFn(isFixed);

      const wrapper = _mount(
        `
        <Sticky @scroll="onScroll"></Sticky>
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

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain('z-index: 99;');
      mockRestore();

      // 吸顶后的事件
      await makeScroll(document.documentElement, 'scrollTop', 200);
      await sleep(TIMEOUT);

      expect(wrapper.find('.t-sticky__content').attributes('style')).toContain(
        'z-index: 99; position: fixed; top: 0px;',
      );
      mockRestore();

      expect(onScrollParameterFn).toHaveBeenCalledWith(false);
      expect(onScrollParameterFn).toHaveBeenCalledWith(true);
    });
  });
});
