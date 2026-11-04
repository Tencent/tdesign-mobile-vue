/* eslint-disable vue/one-component-per-file -- 测试文件中内联 defineComponent 构造 ConfigProvider 场景 */
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Comment from '../comment';
import ConfigProvider from '../../config-provider';
import Avatar from '../../avatar';
import type { CommentActionItem, CommentFold } from '../type';

// folds.content 的声明类型仅接受 TNode 函数，但组件实际按字符串/字符串组直接渲染（见 comment.tsx foldsContent），
// 这里以双重断言收敛到声明类型，参考 watermark 测试的 as unknown as 模式。
const DEFAULT_FOLDS_CONTENT = {
  collapsed: '展开回复',
  partial: ['展开更多回复', '收起'],
  expanded: '收起',
} as unknown as NonNullable<CommentFold['content']>;

describe('Comment', () => {
  describe('props', () => {
    it('actions[array]', () => {
      // array
      const actions: CommentActionItem[] = [
        { key: 'reply', placement: 'start', content: '回复' },
        { key: 'like', placement: 'end', content: '点赞' },
      ];
      const wrapper = mount(Comment, {
        props: { actions },
      });
      const blocks = wrapper.findAll('.t-comment-block');
      expect(blocks).toHaveLength(2);
      expect(blocks[0].text()).toBe('回复');
      expect(blocks[1].text()).toBe('点赞');
    });

    it('actions[function]', () => {
      const wrapper = mount(Comment, {
        props: { actions: () => h('span', { class: 'custom-action' }, '操作') },
      });
      expect(wrapper.find('.custom-action').exists()).toBe(true);
    });

    // 未传 actions 时提前返回；传数组或函数时又优先渲染 Prop，无法单独使用 actions 插槽。
    it.todo('actions[slot]');

    it('author[string]', () => {
      const wrapper = mount(Comment, {
        props: { author: '张三' },
      });
      expect(wrapper.find('.t-comment__author').text()).toBe('张三');
    });

    it('author[function]', () => {
      const wrapper = mount(Comment, { props: { author: () => <span>函数作者</span> } });
      expect(wrapper.find('.t-comment__author').text()).toBe('函数作者');
    });

    it('author[slot]', () => {
      const wrapper = mount(Comment, {
        slots: { author: () => h('span', { class: 'custom-author' }, '作者') },
      });
      expect(wrapper.find('.custom-author').text()).toBe('作者');
    });

    it('avatar[string]', () => {
      const wrapper = mount(Comment, {
        props: { avatar: 'https://example.com/avatar.png' },
      });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(true);
      expect(wrapper.findComponent(Avatar).props('image')).toBe('https://example.com/avatar.png');
    });

    it('avatar[object]', () => {
      const wrapper = mount(Comment, {
        props: { avatar: { image: 'https://example.com/avatar.png', shape: 'round', size: 'small' } },
      });
      expect(wrapper.find('.t-comment__avatar').exists()).toBe(true);
      expect(wrapper.findComponent(Avatar).props()).toMatchObject({
        image: 'https://example.com/avatar.png',
        shape: 'round',
        size: 'small',
      });
    });

    it('avatar[function]', () => {
      const wrapper = mount(Comment, { props: { avatar: () => <span class="prop-avatar">自定义头像</span> } });
      expect(wrapper.find('.prop-avatar').text()).toBe('自定义头像');
    });

    it('avatar[slot]', () => {
      const wrapper = mount(Comment, {
        slots: { avatar: () => h('span', { class: 'custom-avatar' }, 'custom') },
      });
      expect(wrapper.find('.custom-avatar').exists()).toBe(true);
    });

    it('content[string]', () => {
      const wrapper = mount(Comment, {
        props: { content: '这是评论内容' },
      });
      expect(wrapper.find('.t-comment__content').text()).toBe('这是评论内容');
    });

    it('content[function]', () => {
      const wrapper = mount(Comment, {
        props: { content: () => '函数评论内容' },
      });
      expect(wrapper.find('.t-comment__content').text()).toBe('函数评论内容');
    });

    it('content[slot]', () => {
      const wrapper = mount(Comment, { slots: { content: () => <span>插槽评论</span> } });
      expect(wrapper.find('.t-comment__content').text()).toBe('插槽评论');
    });

    it('datetime[string]', () => {
      const wrapper = mount(Comment, {
        props: { datetime: '今天16:38' },
      });
      expect(wrapper.find('.t-comment__date').text()).toBe('今天16:38');
    });

    it('datetime[function]', () => {
      const wrapper = mount(Comment, {
        props: { datetime: () => '昨天20:00' },
      });
      expect(wrapper.find('.t-comment__date').text()).toBe('昨天20:00');
    });

    it('datetime[slot]', () => {
      const wrapper = mount(Comment, { slots: { datetime: () => <span>插槽时间</span> } });
      expect(wrapper.find('.t-comment__date').text()).toBe('插槽时间');
    });

    it('folds[object]', async () => {
      const onFolds = vi.fn();
      const wrapper = mount(Comment, { props: { folds: { state: 'collapsed', total: 5 }, onFolds } });
      await wrapper.find('.t-comment__folds-item').trigger('click');
      // 受控状态不因点击自行改变，需由父级更新。
      expect(wrapper.findAll('.t-comment__folds-item')).toHaveLength(1);
      expect(wrapper.find('.t-comment__folds-item').text()).toContain('展开回复');
      await wrapper.setProps({ folds: { state: 'partial', total: 5 } });
      expect(wrapper.findAll('.t-comment__folds-item')).toHaveLength(2);
      await wrapper.setProps({ folds: { state: 'expanded', total: 5 } });
      expect(wrapper.findAll('.t-comment__folds-item')).toHaveLength(1);
      expect(wrapper.find('.t-comment__folds-item').text()).toContain('收起');
    });

    // modelValue 在 props.ts 中声明（CommentFold 结构），但组件未消费该属性，受控折叠请使用 folds
    it.todo('modelValue[object]');

    it('defaultFolds[object]', async () => {
      const wrapper = mount(Comment, {
        props: { defaultFolds: { state: 'collapsed', total: 5, step: 3, content: DEFAULT_FOLDS_CONTENT } },
        slots: { reply: () => h('div', { class: 'reply-item' }, '回复') },
      });
      // 非受控初始态取 defaultFolds.state
      expect(wrapper.find('.t-comment__folds').text()).toContain('展开回复');

      // step = 3：第一次展开进入 partial（“展开更多回复/收起”两项）
      await wrapper.find('.t-comment__folds-item').trigger('click');
      let $items = wrapper.findAll('.t-comment__folds-item');
      expect($items).toHaveLength(2);
      expect($items[0].text()).toContain('展开更多回复');

      // 第二次展开达到 step 步进上限，进入 expanded
      await $items[0].trigger('click');
      $items = wrapper.findAll('.t-comment__folds-item');
      expect($items).toHaveLength(1);
      expect($items[0].text()).toContain('收起');

      // expanded 态点击收起，回到 collapsed
      await $items[0].trigger('click');
      expect(wrapper.find('.t-comment__folds-item').text()).toContain('展开回复');
    });

    it('reply[string]', () => {
      const wrapper = mount(Comment, { props: { reply: '回复内容' } });
      expect(wrapper.find('.t-comment__reply-inner').text()).toBe('回复内容');
    });

    it('reply[function]', () => {
      const wrapper = mount(Comment, { props: { reply: () => <span>函数回复</span> } });
      expect(wrapper.find('.t-comment__reply-inner').text()).toBe('函数回复');
    });

    it('reply[slot]', () => {
      const wrapper = mount(Comment, {
        slots: { reply: () => h('div', { class: 'reply-slot' }, '回复插槽') },
      });
      expect(wrapper.find('.reply-slot').exists()).toBe(true);
    });

    it('default[slot]', () => {
      const wrapper = mount(Comment, {
        slots: { default: () => h('div', { class: 'reply-child' }, '嵌套回复') },
      });
      expect(wrapper.find('.reply-child').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('actions', async () => {
      const onActions = vi.fn();
      const action: CommentActionItem = { key: 'reply', placement: 'start', content: '回复' };
      const wrapper = mount(Comment, {
        props: {
          actions: [action],
          onActions,
        },
      });
      const actionItem = wrapper.find('.t-comment-block > div');
      await actionItem.trigger('click');
      expect(onActions).toHaveBeenCalledWith({ action, e: expect.any(Event) });
      expect(onActions).toHaveBeenCalledTimes(1);

      const actions = () => <span>函数操作</span>;
      const functionWrapper = mount(Comment, { props: { actions, onActions } });
      await functionWrapper.find('.t-comment__actions > div').trigger('click');
      expect(onActions).toHaveBeenLastCalledWith({ action: actions, e: expect.any(MouseEvent) });
      expect(onActions).toHaveBeenCalledTimes(2);
    });

    it('folds', async () => {
      const onFolds = vi.fn();
      const defaultFolds: CommentFold = { state: 'collapsed', total: 5, step: 3 };
      const wrapper = mount(Comment, { props: { defaultFolds, onFolds } });
      await wrapper.find('.t-comment__folds-item').trigger('click');
      expect(onFolds).toHaveBeenNthCalledWith(1, {
        fold: { ...defaultFolds, state: 'partial' },
        e: expect.any(MouseEvent),
      });
      await wrapper.findAll('.t-comment__folds-item')[0].trigger('click');
      expect(onFolds).toHaveBeenNthCalledWith(2, {
        fold: { ...defaultFolds, state: 'expanded' },
        e: expect.any(MouseEvent),
      });
      await wrapper.find('.t-comment__folds-item').trigger('click');
      expect(onFolds).toHaveBeenNthCalledWith(3, {
        fold: { ...defaultFolds, state: 'collapsed' },
        e: expect.any(MouseEvent),
      });
      expect(onFolds).toHaveBeenCalledTimes(3);
    });
  });

  describe('globalConfig', () => {
    // ConfigProvider 的 globalConfig.comment 可以覆盖默认文案
    it('comment', () => {
      const wrapper = mount(
        <ConfigProvider
          globalConfig={{
            comment: { collapsedText: 'Expand replies', expandMoreText: 'More replies', collapseText: 'Collapse' },
          }}
        >
          <Comment
            folds={{ state: 'collapsed', total: 5, step: 3 }}
            v-slots={{ reply: () => <div class="reply-item">reply</div> }}
          />
        </ConfigProvider>,
      );
      expect(wrapper.find('.t-comment__folds').text()).toContain('Expand replies');
    });

    // folds.content 的优先级高于全局配置
    it('comment priority below folds.content', () => {
      const wrapper = mount(
        <ConfigProvider globalConfig={{ comment: { collapsedText: 'Expand replies' } }}>
          <Comment
            folds={{
              state: 'collapsed',
              total: 5,
              step: 3,
              content: { collapsed: '自定义展开文案' } as unknown as NonNullable<CommentFold['content']>,
            }}
            v-slots={{ reply: () => <div class="reply-item">reply</div> }}
          />
        </ConfigProvider>,
      );
      const text = wrapper.find('.t-comment__folds').text();
      expect(text).toContain('自定义展开文案');
      expect(text).not.toContain('Expand replies');
    });

    // folds.content.partial 作为数组整体覆盖，不与全局配置做字段级合并
    it('comment partial pair fully overridden by folds.content.partial', () => {
      const wrapper = mount(
        <ConfigProvider globalConfig={{ comment: { expandMoreText: 'More replies', collapseText: 'Collapse' } }}>
          <Comment
            folds={{
              state: 'partial',
              total: 5,
              step: 3,
              content: { partial: ['自定义更多回复', '自定义收起'] } as unknown as NonNullable<CommentFold['content']>,
            }}
            v-slots={{ reply: () => <div class="reply-item">reply</div> }}
          />
        </ConfigProvider>,
      );
      const items = wrapper.findAll('.t-comment__folds-item');
      expect(items[0].text()).toContain('自定义更多回复');
      expect(items[1].text()).toContain('自定义收起');
    });

    // 全局配置支持字段级深合并，未覆盖的字段回退到默认语言包
    it('comment deep-merges with default locale', () => {
      const wrapper = mount(
        <ConfigProvider globalConfig={{ comment: { collapsedText: '仅覆盖折叠文案' } }}>
          <Comment
            folds={{ state: 'partial', total: 5, step: 3 }}
            v-slots={{ reply: () => <div class="reply-item">reply</div> }}
          />
        </ConfigProvider>,
      );
      const items = wrapper.findAll('.t-comment__folds-item');
      // expandMoreText/collapseText 未被覆盖，回退到默认语言包中的中文文案
      expect(items[0].text()).toContain('展开更多回复');
      expect(items[1].text()).toContain('收起');
    });
  });

  describe('scenarios', () => {
    it('folds takes priority over defaultFolds', () => {
      const wrapper = mount(Comment, {
        props: {
          folds: { state: 'expanded', total: 5 },
          defaultFolds: { state: 'collapsed', total: 5 },
        },
      });
      expect(wrapper.find('.t-comment__folds-item').text()).toContain('收起');
    });

    it('partial replies can be collapsed before reaching expanded', async () => {
      const onFolds = vi.fn();
      const wrapper = mount(Comment, {
        props: { defaultFolds: { state: 'collapsed', total: 5, step: 4 }, onFolds },
      });
      await wrapper.find('.t-comment__folds-item').trigger('click');
      expect(wrapper.findAll('.t-comment__folds-item')).toHaveLength(2);
      await wrapper.findAll('.t-comment__folds-item')[1].trigger('click');
      expect(wrapper.find('.t-comment__folds-item').text()).toContain('展开回复');
      expect(onFolds).toHaveBeenLastCalledWith({
        fold: { state: 'collapsed', total: 5, step: 4 },
        e: expect.any(MouseEvent),
      });
    });

    it('actions functions receive their disabled state', () => {
      const renderAction = vi.fn(() => <span>自定义操作</span>);
      const actions: CommentActionItem[] = [{ key: 'like', placement: 'end', disabled: true, content: renderAction }];
      const wrapper = mount(Comment, { props: { actions } });
      expect(wrapper.find('.t-comment__actions').text()).toBe('自定义操作');
      expect(renderAction).toHaveBeenCalledWith(expect.any(Function), { disabled: true });
    });

    // folds.content 类型声明允许 TNode，但 renderFoldsContent 直接输出函数而不执行。
    it.todo('folds content renders TNode functions');

    it('folds with total <= 1 does not render the folds area', () => {
      let wrapper = mount(Comment, {
        props: { folds: { state: 'collapsed', total: 1, content: DEFAULT_FOLDS_CONTENT } },
      });
      expect(wrapper.find('.t-comment__folds').exists()).toBe(false);

      wrapper = mount(Comment, {
        props: { folds: { state: 'collapsed', total: 0, content: DEFAULT_FOLDS_CONTENT } },
      });
      expect(wrapper.find('.t-comment__folds').exists()).toBe(false);
    });

    it('controlled folds click still emits folds callbacks', async () => {
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

    // 不传 folds.content 时，默认使用全局配置（zh_CN 语言包）中的 comment 文案
    it('falls back to global config default locale text when folds.content is not provided', () => {
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

    it('renders correct root structure', () => {
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
