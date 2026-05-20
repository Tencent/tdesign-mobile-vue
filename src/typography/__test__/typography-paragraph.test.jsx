import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Paragraph from '../paragraph';
import Ellipsis from '../ellipsis';

const prefix = 't';
const COMPONENT_NAME = `${prefix}-typography`;

const longText =
  'TDesign 秉承开放的设计理念从创立之初就采用开源协作的方式进行设计和开发。协作方案讨论、组件设计以及 API 设计，包括源代码在内均在公司内部完全开放，赢得了内部开发者和设计师的广泛关注。TDesign 遵循平等、开放、严格的原则，不论参与者的角色如何。';
const shortText = 'TDesign 是腾讯各业务团队在服务业务过程中沉淀的一套企业级设计体系。';

describe('Typography Paragraph', () => {
  describe('props', () => {
    it(':default slot', () => {
      const wrapper = mount(Paragraph, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find('p').exists()).toBe(true);
      expect(wrapper.text()).toContain(shortText);
    });

    it(':content[String]', () => {
      const wrapper = mount(Paragraph, {
        props: { content: shortText },
      });
      expect(wrapper.find('p').exists()).toBe(true);
      expect(wrapper.text()).toContain(shortText);
    });

    it(':content[Function]', () => {
      const wrapper = mount(Paragraph, {
        props: { content: () => shortText },
      });
      // Paragraph renders function content via TNode mechanism
      expect(wrapper.find(`.${COMPONENT_NAME}`).exists()).toBe(true);
    });

    it('renders as p tag with class', () => {
      const wrapper = mount(Paragraph, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`p.${COMPONENT_NAME}`).exists()).toBe(true);
    });

    it(':ellipsis[Boolean]', () => {
      const wrapper = mount(Paragraph, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
    });

    it(':ellipsis[Object] with expandable', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Paragraph, {
        props: {
          ellipsis: {
            row: 2,
            expandable: true,
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
    });

    it(':ellipsis[Object] with collapsible', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Paragraph, {
        props: {
          ellipsis: {
            expandable: true,
            collapsible: true,
            onExpand,
          },
        },
        slots: { default: () => longText },
      });

      await nextTick();
      const expandSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      await expandSymbol.trigger('click');

      await nextTick();
      const collapseSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);
      expect(collapseSymbol.text()).toContain('收起');
    });

    it(':ellipsis[Object] without expandable', () => {
      const wrapper = mount(Paragraph, {
        props: {
          ellipsis: {
            row: 2,
            expandable: false,
          },
        },
        slots: { default: () => longText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

  });
});
