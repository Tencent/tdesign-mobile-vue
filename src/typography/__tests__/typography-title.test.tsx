import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import Title from '../title';
import Ellipsis from '../ellipsis';
import { COMPONENT_NAME, longText, shortText } from './mount';

enableAutoUnmount(afterEach);

describe('Typography Title', () => {
  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(Title, {
        props: { content: shortText },
      });
      expect(wrapper.find('h1').exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    it('content[function]', () => {
      const wrapper = mount(Title, {
        props: { content: () => <em class="function-content">{shortText}</em> },
      });
      expect(wrapper.get('h1 .function-content').text()).toBe(shortText);
    });

    it('content[slot]', () => {
      const wrapper = mount(Title, {
        slots: { content: () => shortText },
      });
      expect(wrapper.text()).toBe(shortText);
    });

    it('default[string]', () => {
      const wrapper = mount(Title, {
        props: { default: shortText },
      });
      expect(wrapper.find('h1').exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    it('default[function]', () => {
      const wrapper = mount(Title, {
        props: { default: () => <em class="function-default">{shortText}</em> },
      });
      expect(wrapper.get('h1 .function-default').text()).toBe(shortText);
    });

    it('default[slot]', () => {
      const wrapper = mount(Title, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`h1.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    it('ellipsis[boolean]', () => {
      const wrapper = mount(Title, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.text()).toContain(longText);
      const pEl = wrapper.find('p');
      expect(pEl.exists()).toBe(true);
      expect(pEl.element.style.overflow).toBe('hidden');
      expect(pEl.element.style.textOverflow).toBe('ellipsis');
    });

    it('ellipsis[object]', () => {
      const wrapper = mount(Title, {
        props: { ellipsis: { row: 3 } },
        slots: { default: () => longText },
      });
      expect(wrapper.findComponent(Ellipsis).props('ellipsis')).toEqual({ row: 3 });
      expect(wrapper.find('p').element.style.overflow).toBe('hidden');
    });

    it('ellipsis[expandable]', () => {
      const expandableWrapper = mount(Title, {
        props: { ellipsis: { expandable: true } },
        slots: { default: () => longText },
      });
      const symbol = expandableWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.text()).toBe('展开');

      const collapsedWrapper = mount(Title, {
        props: { ellipsis: { expandable: false } },
        slots: { default: () => longText },
      });
      expect(collapsedWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('ellipsis[collapsible]', async () => {
      const collapsibleWrapper = mount(Title, {
        props: { ellipsis: { expandable: true, collapsible: true } },
        slots: { default: () => longText },
      });

      await collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      const collapseSymbol = collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);
      expect(collapseSymbol.text()).toBe('收起');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('visible');

      await collapseSymbol.trigger('click');
      expect(collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('展开');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('hidden');

      const unCollapsibleWrapper = mount(Title, {
        props: { ellipsis: { expandable: true, collapsible: false } },
        slots: { default: () => longText },
      });
      await unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
      expect(unCollapsibleWrapper.find('p').element.style.overflow).toBe('visible');
    });

    it('ellipsis[suffix-function]', () => {
      const wrapper = mount(Title, {
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

    it('level[h1]', () => {
      const wrapper = mount(Title, {
        slots: { default: () => shortText },
      });
      // 未设置时默认渲染 h1
      expect(wrapper.find('h1').exists()).toBe(true);
      expect(wrapper.text()).toBe(shortText);
    });

    it('level[h2]', () => {
      const wrapper = mount(Title, {
        props: { level: 'h2' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h2').exists()).toBe(true);
      expect(wrapper.find('h1').exists()).toBe(false);
    });

    it('level[h3]', () => {
      const wrapper = mount(Title, {
        props: { level: 'h3' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h3').exists()).toBe(true);
    });

    it('level[h4]', () => {
      const wrapper = mount(Title, {
        props: { level: 'h4' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h4').exists()).toBe(true);
    });

    it('level[h5]', () => {
      const wrapper = mount(Title, {
        props: { level: 'h5' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h5').exists()).toBe(true);
    });

    it('level[h6]', () => {
      const wrapper = mount(Title, {
        props: { level: 'h6' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h6').exists()).toBe(true);
    });
  });

  describe('events', () => {
    it('expand', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Title, {
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
    it('ellipsis[boolean] & content[string]', () => {
      const wrapper = mount(Title, {
        props: { ellipsis: true, content: longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.text()).toContain(longText);
    });

    // 源码未实现：content 属性透传到 Ellipsis 后覆盖含标题标签的插槽，配置的 level 不再渲染
    it.todo('preserves the heading level when the content prop is ellipsized');

    it('updates heading level across plain and ellipsis modes', async () => {
      const wrapper = mount(Title, {
        props: { level: 'h2' },
        slots: { default: () => shortText },
      });
      await wrapper.setProps({ level: 'h4', ellipsis: { row: 2 } });
      expect(wrapper.find('h2').exists()).toBe(false);
      expect(wrapper.get('p h4').text()).toBe(shortText);
      await wrapper.setProps({ level: 'h5', ellipsis: false });
      expect(wrapper.get('h5').text()).toBe(shortText);
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(false);
    });

    it('preserves custom attributes and classes on the heading', () => {
      const wrapper = mount(Title, {
        attrs: { id: 'heading', class: 'custom-heading', 'aria-label': '标题' },
        slots: { default: () => shortText },
      });
      const heading = wrapper.get('h1');
      expect(heading.attributes('id')).toBe('heading');
      expect(heading.attributes('aria-label')).toBe('标题');
      expect(heading.classes()).toEqual(expect.arrayContaining([COMPONENT_NAME, 'custom-heading']));
    });

    it('renders heading tag with typography class', () => {
      const wrapper = mount(Title, {
        props: { level: 'h2' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`h2.${COMPONENT_NAME}`).exists()).toBe(true);
    });

    it('ellipsis[boolean] & level[h3]', () => {
      const wrapper = mount(Title, {
        props: { ellipsis: true, level: 'h3' },
        slots: { default: () => longText },
      });
      // 省略模式下标题标签渲染在 Ellipsis 内部的 p 中
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.find('p h3').exists()).toBe(true);
      expect(wrapper.find('p h3').text()).toBe(longText);
    });

    it('default slot takes precedence over content prop', () => {
      const wrapper = mount(Title, {
        props: { content: 'content-prop' },
        slots: { default: () => 'default-slot' },
      });
      expect(wrapper.text()).toBe('default-slot');
    });
  });
});
