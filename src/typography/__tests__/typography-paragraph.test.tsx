import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import Paragraph from '../paragraph';
import Ellipsis from '../ellipsis';
import { COMPONENT_NAME, longText, shortText, mountWithEllipsis } from './mount';

enableAutoUnmount(afterEach);

describe('Typography Paragraph', () => {
  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(Paragraph, {
        props: { content: shortText },
      });
      expect(wrapper.find(`p.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    // 源码未实现：paragraph.tsx 直接渲染 props.content，未按 TNode 执行函数，函数内容会被渲染为函数源码文本
    it.todo('content[function]');

    // 源码未实现：paragraph.tsx 未读取 content 插槽
    it.todo('content[slot]');

    // 源码未实现：paragraph.tsx 仅读取 content 属性与 default 插槽，未读取 default 属性（传入后内容不渲染）
    it.todo('default[string]');

    // 源码未实现：paragraph.tsx 仅读取 content 属性与 default 插槽，未读取 default 属性（传入后内容不渲染）
    it.todo('default[function]');
    it('default[slot]', () => {
      const wrapper = mount(Paragraph, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`p.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    it('ellipsis[boolean]', () => {
      const wrapper = mountWithEllipsis(Paragraph, true);
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.text()).toContain(longText);
      const pEl = wrapper.find('p');
      expect(pEl.exists()).toBe(true);
      expect(pEl.element.style.overflow).toBe('hidden');
      expect(pEl.element.style.textOverflow).toBe('ellipsis');
    });

    it('ellipsis[object]', () => {
      const wrapper = mountWithEllipsis(Paragraph, { row: 2 });
      expect(wrapper.findComponent(Ellipsis).props('ellipsis')).toEqual({ row: 2 });
      expect(wrapper.find('p').element.style.overflow).toBe('hidden');
    });

    it('ellipsis[expandable]', () => {
      const expandableWrapper = mountWithEllipsis(Paragraph, { expandable: true });
      const symbol = expandableWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.text()).toBe('展开');

      const collapsedWrapper = mountWithEllipsis(Paragraph, { expandable: false });
      expect(collapsedWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('ellipsis[collapsible]', async () => {
      const collapsibleWrapper = mountWithEllipsis(Paragraph, { expandable: true, collapsible: true });

      await collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      const collapseSymbol = collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);
      expect(collapseSymbol.text()).toBe('收起');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('visible');

      await collapseSymbol.trigger('click');
      expect(collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('展开');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('hidden');

      const unCollapsibleWrapper = mountWithEllipsis(Paragraph, { expandable: true, collapsible: false });
      await unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
      expect(unCollapsibleWrapper.find('p').element.style.overflow).toBe('visible');
    });

    it('ellipsis[suffix-function]', () => {
      const wrapper = mount(Paragraph, {
        props: {
          ellipsis: {
            expandable: true,
            suffix: (h: any, { expanded }: any) => h('span', { class: 'custom-suffix' }, expanded ? '收起' : '更多'),
          },
        },
        slots: { default: () => longText },
      });
      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.find('.custom-suffix').exists()).toBe(true);
      expect(symbol.text()).toBe('更多');
    });
  });

  describe('events', () => {
    it('expand', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Paragraph, {
        props: { ellipsis: { expandable: true, collapsible: true, onExpand } },
        slots: { default: () => longText },
      });

      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(onExpand).toHaveBeenCalledWith(true);

      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(onExpand).toHaveBeenCalledWith(false);
    });
  });

  describe('scenarios', () => {
    it('updates content and switches between paragraph and ellipsis modes', async () => {
      const wrapper = mount(Paragraph, {
        props: { content: '初始内容' },
        slots: { default: () => '后备内容' },
      });
      await wrapper.setProps({ content: '更新内容', ellipsis: { row: 2 } });
      expect(wrapper.get('p').text()).toBe('更新内容');
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      await wrapper.setProps({ content: '', ellipsis: false });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(false);
      expect(wrapper.element.tagName).toBe('P');
      expect(wrapper.text()).toBe('后备内容');
    });

    it('renders as p tag with typography class', () => {
      const wrapper = mount(Paragraph, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`p.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(false);
    });

    it('ellipsis[boolean] & content[string]', () => {
      const wrapper = mount(Paragraph, {
        props: { ellipsis: true, content: longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.text()).toContain(longText);
    });

    it('content prop takes precedence over default slot', () => {
      const wrapper = mount(Paragraph, {
        props: { content: 'content-prop' },
        slots: { default: () => 'default-slot' },
      });
      // 与 Text/Title 不同，Paragraph 优先渲染 content 属性
      expect(wrapper.text()).toBe('content-prop');
    });
  });
});
