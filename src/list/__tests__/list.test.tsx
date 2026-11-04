import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import List from '../index';
import TLoading from '../../loading/loading';
import TCell from '../../cell/index';
import ConfigProvider from '../../config-provider';

const prefix = 't';

const LOADING_TEXT_MAP = {
  loading: '加载中...',
  'load-more': '点击加载更多',
};

enableAutoUnmount(afterEach);

describe('List', () => {
  describe('props', () => {
    it('asyncLoading[string]', async () => {
      // loading：显示加载指示器与全局“加载中”文案
      const wrapper = mount(List, { props: { asyncLoading: 'loading' } });
      const loading = wrapper.findComponent(TLoading);
      expect(loading.props('text')).toEqual(LOADING_TEXT_MAP.loading);
      expect(loading.props('indicator')).toBe(true);

      // load-more：隐藏指示器，显示“点击加载更多”
      await wrapper.setProps({ asyncLoading: 'load-more' });
      expect(wrapper.findComponent(TLoading).props('text')).toEqual(LOADING_TEXT_MAP['load-more']);
      expect(wrapper.findComponent(TLoading).props('indicator')).toBe(false);

      // 其它字符串不进入内置 loading，按自定义内容渲染
      await wrapper.setProps({ asyncLoading: '自定义加载文案' });
      expect(wrapper.findComponent(TLoading).exists()).toBe(false);
      expect(wrapper.get(`.${prefix}-list__loading--wrapper`).text()).toBe('自定义加载文案');

      // 未设置时不渲染任何加载内容
      await wrapper.setProps({ asyncLoading: undefined });
      expect(wrapper.get(`.${prefix}-list__loading--wrapper`).text()).toBe('');
    });

    it('asyncLoading[function]', () => {
      const wrapper = mount(List, {
        props: { asyncLoading: () => <span class="custom-loading">Hello. TDesign List</span> },
      });
      expect(wrapper.get(`.${prefix}-list__loading--wrapper .custom-loading`).text()).toEqual('Hello. TDesign List');
      expect(wrapper.findComponent(TLoading).exists()).toBe(false);
    });

    it('asyncLoading[slot]', () => {
      const wrapper = mount(List, { slots: { asyncLoading: () => <span class="slot-loading">插槽加载</span> } });
      expect(wrapper.get(`.${prefix}-list__loading--wrapper .slot-loading`).text()).toBe('插槽加载');
    });

    it('footer[string]', () => {
      const wrapper = mount(List, { props: { footer: 'this is a footer content' } });
      expect(wrapper.text()).toEqual('this is a footer content');
    });

    it('footer[function]', () => {
      const wrapper = mount(List, { props: { footer: () => <span class="fn-footer">底部内容</span> } });
      expect(wrapper.get('.fn-footer').text()).toEqual('底部内容');
    });

    it('footer[slot]', () => {
      const wrapper = mount(List, { slots: { footer: () => <span class="slot-footer">插槽底部</span> } });
      expect(wrapper.get('.slot-footer').text()).toBe('插槽底部');
    });

    it('header[string]', () => {
      const wrapper = mount(List, { props: { header: 'this is a header content' } });
      expect(wrapper.text()).toEqual('this is a header content');
    });

    it('header[function]', () => {
      const wrapper = mount(List, { props: { header: () => <span class="fn-header">头部内容</span> } });
      expect(wrapper.get('.fn-header').text()).toEqual('头部内容');
    });

    it('header[slot]', () => {
      const wrapper = mount(List, { slots: { header: () => <span class="slot-header">插槽头部</span> } });
      expect(wrapper.get('.slot-header').text()).toBe('插槽头部');
    });

    it('default[slot]', () => {
      const LIST_COUNT = 10;
      const wrapper = mount(List, {
        slots: { default: Array.from({ length: LIST_COUNT }, (_, index) => <TCell key={index}>{index}</TCell>) },
      });
      expect(wrapper.findAllComponents(TCell).length).toEqual(LIST_COUNT);
    });
  });

  describe('events', () => {
    it('loadMore', async () => {
      const onLoadMore = vi.fn();
      const wrapper = mount(List, {
        props: { asyncLoading: 'load-more', onLoadMore },
        slots: { default: () => <TCell>内容</TCell> },
      });

      // 非 load-more 状态点击不触发
      await wrapper.setProps({ asyncLoading: 'loading' });
      await wrapper.find(`.${prefix}-list__loading--wrapper`).trigger('click');
      expect(onLoadMore).not.toHaveBeenCalled();

      await wrapper.setProps({ asyncLoading: 'load-more' });
      await wrapper.find(`.${prefix}-list__loading--wrapper`).trigger('click');
      expect(onLoadMore).toHaveBeenCalledTimes(1);
      expect(onLoadMore).toHaveBeenCalledWith();
    });

    it('scroll', async () => {
      const onScroll = vi.fn();
      const wrapper = mount(List, {
        props: { onScroll },
        slots: { default: () => <TCell>内容</TCell> },
      });
      await wrapper.find(`.${prefix}-list`).trigger('scroll');
      expect(onScroll).toHaveBeenCalledTimes(1);
      // bottomDistance 与 scrollTop 均以数值回传
      const [bottomDistance, scrollTop] = onScroll.mock.calls[0];
      expect(typeof bottomDistance).toBe('number');
      expect(typeof scrollTop).toBe('number');
    });
  });

  describe('globalConfig', () => {
    it('list', () => {
      const wrapper = mount(ConfigProvider, {
        props: { globalConfig: { list: { loading: 'Loading...', loadingMoreText: 'Load more' } } },
        slots: {
          default: () => <List asyncLoading="loading" v-slots={{ default: () => <TCell>内容</TCell> }} />,
        },
      });
      expect(wrapper.findComponent(TLoading).props('text')).toBe('Loading...');

      const loadMoreWrapper = mount(ConfigProvider, {
        props: { globalConfig: { list: { loading: 'Loading...', loadingMoreText: 'Load more' } } },
        slots: {
          default: () => <List asyncLoading="load-more" v-slots={{ default: () => <TCell>内容</TCell> }} />,
        },
      });
      expect(loadMoreWrapper.findComponent(TLoading).props('text')).toBe('Load more');
    });
  });

  describe('scenarios', () => {
    it('renders header, items, loading area and footer in order', () => {
      const wrapper = mount(List, {
        props: {
          header: () => <span class="order-header">头部</span>,
          footer: () => <span class="order-footer">底部</span>,
          asyncLoading: '加载文案',
        },
        slots: { default: () => <TCell>列表项</TCell> },
      });
      expect(Array.from(wrapper.element.children).map((el) => el.className)).toEqual([
        'order-header',
        't-cell',
        't-list__loading--wrapper',
        'order-footer',
      ]);
    });
  });
});
