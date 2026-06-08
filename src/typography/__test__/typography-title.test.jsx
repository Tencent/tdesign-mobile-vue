import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Title from '../title';
import Ellipsis from '../ellipsis';

const prefix = 't';
const COMPONENT_NAME = `${prefix}-typography`;

const longText =
  'TDesign 秉承开放的设计理念从创立之初就采用开源协作的方式进行设计和开发。协作方案讨论、组件设计以及 API 设计，包括源代码在内均在公司内部完全开放，赢得了内部开发者和设计师的广泛关注。TDesign 遵循平等、开放、严格的原则，不论参与者的角色如何。';
const shortText = 'TDesign 是腾讯各业务团队在服务业务过程中沉淀的一套企业级设计体系。';

describe('Typography Title', () => {
  describe('props', () => {
    it(':default slot', () => {
      const wrapper = mount(Title, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h1').exists()).toBe(true);
      expect(wrapper.text()).toContain(shortText);
    });

    it(':content[String]', () => {
      const wrapper = mount(Title, {
        props: { content: shortText },
      });
      expect(wrapper.find('h1').exists()).toBe(true);
      expect(wrapper.text()).toContain(shortText);
    });

    it(':content[Function]', () => {
      const wrapper = mount(Title, {
        props: { content: () => shortText },
      });
      expect(wrapper.text()).toContain(shortText);
    });

    it(':level[String] - h1 (default)', () => {
      const wrapper = mount(Title, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h1').exists()).toBe(true);
    });

    it(':level[String] - h2', () => {
      const wrapper = mount(Title, {
        props: { level: 'h2' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h2').exists()).toBe(true);
    });

    it(':level[String] - h3', () => {
      const wrapper = mount(Title, {
        props: { level: 'h3' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h3').exists()).toBe(true);
    });

    it(':level[String] - h4', () => {
      const wrapper = mount(Title, {
        props: { level: 'h4' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h4').exists()).toBe(true);
    });

    it(':level[String] - h5', () => {
      const wrapper = mount(Title, {
        props: { level: 'h5' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h5').exists()).toBe(true);
    });

    it(':level[String] - h6', () => {
      const wrapper = mount(Title, {
        props: { level: 'h6' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('h6').exists()).toBe(true);
    });

    it(':ellipsis[Boolean]', () => {
      const wrapper = mount(Title, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
    });

    it(':ellipsis with content prop', () => {
      const wrapper = mount(Title, {
        props: {
          ellipsis: true,
          content: longText,
        },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.text()).toContain(longText);
    });

    it(':ellipsis[Object] with expandable and collapsible', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Title, {
        props: {
          ellipsis: {
            row: 1,
            expandable: true,
            collapsible: true,
            onExpand,
          },
        },
        slots: { default: () => longText },
      });

      await nextTick();
      const expandSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(expandSymbol.exists()).toBe(true);

      await expandSymbol.trigger('click');
      expect(onExpand).toHaveBeenCalledWith(true);

      await nextTick();
      const collapseSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);
    });

    it(':ellipsis[Object] with row', () => {
      const wrapper = mount(Title, {
        props: {
          ellipsis: {
            row: 3,
          },
        },
        slots: { default: () => longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
    });

    it('without ellipsis renders correct tag with class', () => {
      const wrapper = mount(Title, {
        props: { level: 'h2' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`h2.${COMPONENT_NAME}`).exists()).toBe(true);
    });

    it(':level[empty string] passes validator', () => {
      const wrapper = mount(Title, {
        props: { level: '' },
        slots: { default: () => shortText },
      });
      // validator returns true for falsy val, component still renders
      expect(wrapper.exists()).toBe(true);
    });
  });
});
