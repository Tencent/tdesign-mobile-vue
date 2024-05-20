import { ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import List from '../list.vue';
import TLoading from '../../loading/loading';
import TCell from '../../cell/index';

const prefix = 't';
const name = `${prefix}-list`;

const sleep = (duration) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, duration),
  );

const LOADING_TEXT_MAP = {
  loading: '加载中...',
  'load-more': '点击加载更多',
};
describe('list', () => {
  describe('props', () => {
    it(': asyncLoading', () => {
      const wrapper = mount(List, {
        props: {
          // 加载中状态
          asyncLoading: 'loading',
        },
      });
      expect(wrapper.findComponent(TLoading).props().text).toEqual(LOADING_TEXT_MAP.loading);
    });

    it(': footer', () => {
      const FOOTER_CONTENT = 'this is a footer content';
      const wrapper = mount(List, {
        props: {
          footer: FOOTER_CONTENT,
        },
      });
      expect(wrapper.text()).toEqual(FOOTER_CONTENT);
    });

    it(': header', () => {
      const HEADER_CONTENT = 'this is a header content';
      const wrapper = mount(List, {
        props: {
          header: HEADER_CONTENT,
        },
      });
      expect(wrapper.text()).toEqual(HEADER_CONTENT);
    });
  });

  describe('slots', () => {
    it(': default', () => {
      const LIST_COUNT = 10;
      const MOCK_LIST = Array(LIST_COUNT).fill(1);
      const wrapper = mount(List, {
        slots: {
          default: MOCK_LIST.map((item, index) => (
            <TCell align="middle">
              <span class="cell">{index}</span>
            </TCell>
          )),
        },
      });
      expect(wrapper.findAllComponents(TCell).length).toEqual(LIST_COUNT);
    });
  });

  describe('event', () => {
    it(': load-more', async () => {
      const LIST_COUNT = 20;
      const MOCK_LIST = Array(LIST_COUNT).fill(0);
      const onLoadMore = vi.fn(() => {
        MOCK_LIST.push(...Array(LIST_COUNT).fill(1));
      });
      const loading = ref('');
      const wrapper = mount(List, {
        props: {
          asyncLoading: loading.value,
          onLoadMore,
        },
        slots: {
          default: MOCK_LIST.map((item, index) => (
            <TCell align="middle">
              <span class="cell">{index}</span>
            </TCell>
          )),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findAllComponents(TCell).length).toEqual(LIST_COUNT);
      await wrapper.setProps({
        asyncLoading: 'load-more',
      });
      // 点击 loading 区域内容，模拟触发 loadMore
      const $loadingWrapper = wrapper.find(`.t-list__loading--wrapper`);
      await $loadingWrapper.trigger('click');
      expect(onLoadMore).toHaveBeenCalled();
    });

    it(': scroll', async (ctx) => {
      const LIST_COUNT = 10;
      const MOCK_LIST = ref(Array(LIST_COUNT).fill(0));
      const onScroll = vi.fn(() => {
        MOCK_LIST.value.push(...Array(LIST_COUNT).fill(1));
      });
      const wrapper = mount(List, {
        props: {
          asyncLoading: 'loading', // 点击加载更多, 用于 onLoadMore 点击事件, 当前演示页暂无演示代码
          onScroll,
        },
        slots: {
          default: MOCK_LIST.value.map((item, index) => (
            <TCell align="middle">
              <span class="cell">{index}</span>
            </TCell>
          )),
        },
      });
      const $list = wrapper.find(`.t-list`);
      await $list.trigger('scroll');
      expect(onScroll).toHaveBeenCalled();
      expect(MOCK_LIST.value.length).toEqual(LIST_COUNT * 2);
    });
  });
});
