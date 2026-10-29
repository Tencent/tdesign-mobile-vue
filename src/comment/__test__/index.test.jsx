import { h, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Comment from '../comment';
import ConfigProvider from '../../config-provider';

const DEFAULT_FOLDS_CONTENT = {
  collapsed: '展开回复',
  partial: ['展开更多回复', '收起'],
  expanded: '收起',
};

describe('comment', () => {
  describe('props', () => {
    it(':avatar', () => {
      // string
      let wrapper = mount(Comment, {
        props: { avatar: 'https://example.com/avatar.png' },
      });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(true);

      // object
      wrapper = mount(Comment, {
        props: { avatar: { image: 'https://example.com/avatar.png', shape: 'circle' } },
      });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(true);

      // slot
      wrapper = mount(Comment, {
        slots: { avatar: () => h('span', { class: 'custom-avatar' }, 'custom') },
      });
      expect(wrapper.find('.custom-avatar').exists()).toBe(true);
    });

    it(':author', () => {
      // string
      let wrapper = mount(Comment, {
        props: { author: '张三' },
      });
      expect(wrapper.find('.t-comment__author').text()).toBe('张三');

      // slot
      wrapper = mount(Comment, {
        slots: { author: () => h('span', { class: 'custom-author' }, '作者') },
      });
      expect(wrapper.find('.custom-author').text()).toBe('作者');
    });

    it(':content', () => {
      const wrapper = mount(Comment, {
        props: { content: '这是评论内容' },
      });
      expect(wrapper.find('.t-comment__content').text()).toBe('这是评论内容');
    });

    it(':datetime', () => {
      const wrapper = mount(Comment, {
        props: { datetime: '今天16:38' },
      });
      expect(wrapper.find('.t-comment__date').text()).toBe('今天16:38');
    });

    it(':actions', () => {
      // array
      const actions = [
        { key: 'reply', placement: 'start', content: '回复' },
        { key: 'like', placement: 'end', content: '点赞' },
      ];
      let wrapper = mount(Comment, {
        props: { actions },
      });
      const blocks = wrapper.findAll('.t-comment-block');
      expect(blocks).toHaveLength(2);
      expect(blocks[0].text()).toBe('回复');
      expect(blocks[1].text()).toBe('点赞');

      // function
      wrapper = mount(Comment, {
        props: { actions: () => h('span', { class: 'custom-action' }, '操作') },
      });
      expect(wrapper.find('.custom-action').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it(':onActions', async () => {
      const onActions = vi.fn();
      const action = { key: 'reply', placement: 'start', content: '回复' };
      const wrapper = mount(Comment, {
        props: {
          actions: [action],
          onActions,
        },
      });
      const actionItem = wrapper.find('.t-comment-block > div');
      await actionItem.trigger('click');
      expect(onActions).toHaveBeenCalledWith({ action, e: expect.any(Event) });
    });
  });

  describe('folds', () => {
    it(':total does not render folds when <= 1', () => {
      let wrapper = mount(Comment, {
        props: { folds: { state: 'collapsed', total: 1, content: DEFAULT_FOLDS_CONTENT } },
      });
      expect(wrapper.find('.t-comment__folds').exists()).toBe(false);

      wrapper = mount(Comment, {
        props: { folds: { state: 'collapsed', total: 0, content: DEFAULT_FOLDS_CONTENT } },
      });
      expect(wrapper.find('.t-comment__folds').exists()).toBe(false);
    });

    it(':state renders correctly', () => {
      // collapsed
      let wrapper = mount(Comment, {
        props: { folds: { state: 'collapsed', total: 5, content: DEFAULT_FOLDS_CONTENT } },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复1') },
      });
      expect(wrapper.find('.t-comment__folds').text()).toContain('展开回复');

      // expanded
      wrapper = mount(Comment, {
        props: { folds: { state: 'expanded', total: 5, content: DEFAULT_FOLDS_CONTENT } },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      expect(wrapper.find('.t-comment__folds').text()).toContain('收起');

      // partial
      wrapper = mount(Comment, {
        props: { folds: { state: 'partial', total: 5, content: DEFAULT_FOLDS_CONTENT } },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      expect(wrapper.findAll('.t-comment__folds-item')).toHaveLength(2);
    });

    it(':click triggers onFolds', async () => {
      const onFolds = vi.fn();
      // expand
      let wrapper = mount(Comment, {
        props: { folds: { state: 'collapsed', total: 5, content: DEFAULT_FOLDS_CONTENT }, onFolds },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      await wrapper.find('.t-comment__folds-item').trigger('click');
      expect(onFolds.mock.calls[0][0].fold.state).toBe('partial');

      // collapse
      onFolds.mockClear();
      wrapper = mount(Comment, {
        props: { folds: { state: 'expanded', total: 5, content: DEFAULT_FOLDS_CONTENT }, onFolds },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      await wrapper.find('.t-comment__folds-item').trigger('click');
      expect(onFolds.mock.calls[0][0].fold.state).toBe('collapsed');
    });
  });

  describe('i18n', () => {
    // 不传 folds.content 时，默认使用全局配置（zh_CN 语言包）中的 comment 文案
    it(': falls back to global config default locale text when folds.content is not provided', () => {
      let wrapper = mount(Comment, {
        props: { folds: { state: 'collapsed', total: 5, step: 3 } },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      expect(wrapper.find('.t-comment__folds').text()).toContain('展开回复');

      wrapper = mount(Comment, {
        props: { folds: { state: 'partial', total: 5, step: 3 } },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      const items = wrapper.findAll('.t-comment__folds-item');
      expect(items).toHaveLength(2);
      expect(items[0].text()).toContain('展开更多回复');
      expect(items[1].text()).toContain('收起');

      wrapper = mount(Comment, {
        props: { folds: { state: 'expanded', total: 5, step: 3 } },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      expect(wrapper.find('.t-comment__folds').text()).toContain('收起');
    });

    // ConfigProvider 的 globalConfig.comment 可以覆盖默认文案
    it(': ConfigProvider globalConfig.comment overrides default locale text', () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            return () =>
              h(
                ConfigProvider,
                {
                  globalConfig: {
                    comment: {
                      collapsedText: 'Expand replies',
                      expandMoreText: 'More replies',
                      collapseText: 'Collapse',
                    },
                  },
                },
                () =>
                  h(
                    Comment,
                    { folds: { state: 'collapsed', total: 5, step: 3 } },
                    { reply: () => h('div', { class: 'reply-item' }, 'reply') },
                  ),
              );
          },
        }),
      );
      expect(wrapper.find('.t-comment__folds').text()).toContain('Expand replies');
    });

    // folds.content 的优先级高于 ConfigProvider 的全局配置
    it(': folds.content takes priority over ConfigProvider global config', () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            return () =>
              h(
                ConfigProvider,
                {
                  globalConfig: {
                    comment: {
                      collapsedText: 'Expand replies',
                      expandMoreText: 'More replies',
                      collapseText: 'Collapse',
                    },
                  },
                },
                () =>
                  h(
                    Comment,
                    {
                      folds: {
                        state: 'collapsed',
                        total: 5,
                        step: 3,
                        content: { collapsed: '自定义展开文案' },
                      },
                    },
                    { reply: () => h('div', { class: 'reply-item' }, 'reply') },
                  ),
              );
          },
        }),
      );
      const text = wrapper.find('.t-comment__folds').text();
      expect(text).toContain('自定义展开文案');
      expect(text).not.toContain('Expand replies');
    });

    // folds.content.partial 作为数组整体覆盖，不与全局配置做字段级合并
    it(': folds.content.partial fully overrides global config partial pair', () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            return () =>
              h(
                ConfigProvider,
                {
                  globalConfig: {
                    comment: {
                      expandMoreText: 'More replies',
                      collapseText: 'Collapse',
                    },
                  },
                },
                () =>
                  h(
                    Comment,
                    {
                      folds: {
                        state: 'partial',
                        total: 5,
                        step: 3,
                        content: { partial: ['自定义更多回复', '自定义收起'] },
                      },
                    },
                    { reply: () => h('div', { class: 'reply-item' }, 'reply') },
                  ),
              );
          },
        }),
      );
      const items = wrapper.findAll('.t-comment__folds-item');
      expect(items[0].text()).toContain('自定义更多回复');
      expect(items[1].text()).toContain('自定义收起');
    });

    // ConfigProvider 全局配置支持字段级深合并，未覆盖的字段回退到默认语言包
    it(': ConfigProvider global config deep-merges with default locale, unset fields fall back to defaults', () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            return () =>
              h(
                ConfigProvider,
                {
                  globalConfig: {
                    comment: {
                      collapsedText: '仅覆盖折叠文案',
                    },
                  },
                },
                () =>
                  h(
                    Comment,
                    { folds: { state: 'partial', total: 5, step: 3 } },
                    { reply: () => h('div', { class: 'reply-item' }, 'reply') },
                  ),
              );
          },
        }),
      );
      const items = wrapper.findAll('.t-comment__folds-item');
      // expandMoreText/collapseText 未被覆盖，回退到默认语言包中的中文文案
      expect(items[0].text()).toContain('展开更多回复');
      expect(items[1].text()).toContain('收起');
    });
  });

  describe('defaultFolds', () => {
    it(':initial state and click expand', async () => {
      const wrapper = mount(Comment, {
        props: { defaultFolds: { state: 'collapsed', total: 5, step: 3, content: DEFAULT_FOLDS_CONTENT } },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      expect(wrapper.find('.t-comment__folds').text()).toContain('展开回复');

      await wrapper.find('.t-comment__folds-item').trigger('click');
      expect(wrapper.findAll('.t-comment__folds-item')).toHaveLength(2);
    });
  });

  describe('slots', () => {
    it(':default and reply slot', () => {
      let wrapper = mount(Comment, {
        slots: { default: () => h('div', { class: 'reply-child' }, '嵌套回复') },
      });
      expect(wrapper.find('.reply-child').exists()).toBe(true);

      wrapper = mount(Comment, {
        slots: { reply: () => h('div', { class: 'reply-slot' }, '回复插槽') },
      });
      expect(wrapper.find('.reply-slot').exists()).toBe(true);
    });
  });

  describe('structure', () => {
    it(':renders correct root structure', () => {
      const wrapper = mount(Comment, {
        props: {
          content: '内容',
        },
      });
      expect(wrapper.find('.t-comment').exists()).toBe(true);
      expect(wrapper.find('.t-comment__inner').exists()).toBe(true);
      expect(wrapper.find('.t-comment__detail').exists()).toBe(true);
      expect(wrapper.find('.t-comment__bottom').exists()).toBe(true);
      expect(wrapper.find('.t-comment__reply').exists()).toBe(true);
    });
  });
});
