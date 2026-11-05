import { enableAutoUnmount, mount } from '@vue/test-utils';
import { afterEach, describe, it, expect, vi } from 'vitest';
import Title from '../title';
import Ellipsis from '../ellipsis';
import { COMPONENT_NAME, longText, shortText, mountWithEllipsis } from './mount';

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
      const wrapper = mountWithEllipsis(Title, true);
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.text()).toContain(longText);
      const pEl = wrapper.find('p');
      expect(pEl.exists()).toBe(true);
      expect(pEl.element.style.overflow).toBe('hidden');
      expect(pEl.element.style.textOverflow).toBe('ellipsis');
    });

    it('ellipsis[object]', () => {
      const wrapper = mountWithEllipsis(Title, { row: 3 });
      expect(wrapper.findComponent(Ellipsis).props('ellipsis')).toEqual({ row: 3 });
      expect(wrapper.find('p').element.style.overflow).toBe('hidden');
    });

    it('ellipsis[expandable]', () => {
      const expandableWrapper = mountWithEllipsis(Title, { expandable: true });
      const symbol = expandableWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.text()).toBe('展开');

      const collapsedWrapper = mountWithEllipsis(Title, { expandable: false });
      expect(collapsedWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('ellipsis[collapsible]', async () => {
      const collapsibleWrapper = mountWithEllipsis(Title, { expandable: true, collapsible: true });

      await collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      const collapseSymbol = collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);
      expect(collapseSymbol.text()).toBe('收起');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('visible');

      await collapseSymbol.trigger('click');
      expect(collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('展开');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('hidden');

      const unCollapsibleWrapper = mountWithEllipsis(Title, { expandable: true, collapsible: false });
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
});
