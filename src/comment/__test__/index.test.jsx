import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Comment from '../comment';

// Mock ResizeObserver for jsdom
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

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
