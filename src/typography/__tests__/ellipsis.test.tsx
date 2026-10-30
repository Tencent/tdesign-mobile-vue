import { h, nextTick, defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Ellipsis from '../ellipsis';
import ConfigProvider from '../../config-provider';

const prefix = 't';
const COMPONENT_NAME = `${prefix}-typography`;

const longText =
  'TDesign 秉承开放的设计理念从创立之初就采用开源协作的方式进行设计和开发。协作方案讨论、组件设计以及 API 设计，包括源代码在内均在公司内部完全开放，赢得了内部开发者和设计师的广泛关注。TDesign 遵循平等、开放、严格的原则，不论参与者的角色如何。';

describe('Ellipsis', () => {
  describe('props', () => {
    it('renders content', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: true,
          content: longText,
        },
      });
      expect(wrapper.text()).toContain(longText);
    });

    it('ellipsis styles applied', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            row: 2,
          },
        },
        slots: { default: () => longText },
      });
      const pEl = wrapper.find('p');
      expect(pEl.exists()).toBe(true);
      expect(pEl.element.style.overflow).toBe('hidden');
      // WebkitLineClamp may not be directly accessible in jsdom, check via style attribute
      expect(pEl.element.getAttribute('style')).toContain('overflow: hidden');
    });

    it('ellipsis with row=1 (default)', () => {
      const wrapper = mount(Ellipsis, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      const pEl = wrapper.find('p');
      expect(pEl.element.style.overflow).toBe('hidden');
      expect(pEl.element.style.textOverflow).toBe('ellipsis');
    });

    it('expand changes styles', async () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            collapsible: true,
          },
        },
        slots: { default: () => longText },
      });

      await nextTick();
      const expandSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      await expandSymbol.trigger('click');
      await nextTick();

      const pEl = wrapper.find('p');
      expect(pEl.element.style.overflow).toBe('visible');
      expect(pEl.element.style.display).toBe('initial');
    });

    it('collapse after expand', async () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            collapsible: true,
          },
        },
        slots: { default: () => longText },
      });

      await nextTick();
      // Expand
      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      await nextTick();

      // Collapse
      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      await nextTick();

      const pEl = wrapper.find('p');
      expect(pEl.element.style.overflow).toBe('hidden');
    });

    it('expandable=false does not show expand symbol', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: false,
          },
        },
        slots: { default: () => longText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('collapsible=false hides symbol after expand', async () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            collapsible: false,
          },
        },
        slots: { default: () => longText },
      });

      await nextTick();
      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      await nextTick();

      expect(wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('custom suffix renders correctly', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            suffix: (h, { expanded }) => h('span', { class: 'my-suffix' }, '展开更多'),
          },
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.find('.my-suffix').exists()).toBe(true);
    });

    it('non-function suffix renders correctly', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            suffix: h('span', { class: 'static-suffix' }, '查看更多'),
          },
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.find('.static-suffix').exists()).toBe(true);
    });

    it('renderCopy prop renders copy button', () => {
      const renderCopy = () => h('span', { class: 'copy-btn' }, '复制');
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: true,
          renderCopy,
        },
        slots: { default: () => longText },
      });
      expect(wrapper.find('.copy-btn').exists()).toBe(true);
    });

    it('expand symbol has marginRight when renderCopy exists', () => {
      const renderCopy = () => h('span', { class: 'copy-btn' }, '复制');
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
          },
          renderCopy,
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.element.style.marginRight).toBe('8px');
    });

    it('expand symbol has no marginRight without renderCopy', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
          },
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.element.style.marginRight).toBe('0px');
    });

    it('without ellipsis prop does not apply ellipsis styles', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: false,
        },
        slots: { default: () => longText },
      });
      const pEl = wrapper.find('p');
      // When ellipsis is false, style should not have ellipsis properties
      expect(pEl.element.style.overflow).not.toBe('hidden');
    });

    it('default expand text is 展开', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
          },
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.text()).toContain('展开');
    });

    it('default collapse text is 收起', async () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            collapsible: true,
          },
        },
        slots: { default: () => longText },
      });

      await nextTick();
      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      await nextTick();

      const collapseSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.text()).toContain('收起');
    });

    it('flex container layout', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: true,
        },
        slots: { default: () => longText },
      });

      const container = wrapper.find('div');
      expect(container.element.style.display).toBe('flex');
      expect(container.element.style.alignItems).toBe('flex-end');
    });
  });

  describe('events', () => {
    it('expand', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Ellipsis, {
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
      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(onExpand).toHaveBeenCalledWith(true);

      await nextTick();
      await wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      expect(onExpand).toHaveBeenCalledWith(false);
    });
  });

  describe('slots', () => {
    it('default', () => {
      const wrapper = mount(Ellipsis, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      expect(wrapper.text()).toContain(longText);
    });
  });

  describe('scenarios', () => {
    it('uses globalConfig expandText and collapseText', async () => {
      const wrapper = mount(
        defineComponent({
          setup() {
            return () =>
              h(
                ConfigProvider,
                {
                  globalConfig: {
                    typography: {
                      expandText: 'More',
                      collapseText: 'Less',
                    },
                  },
                },
                () =>
                  h(
                    Ellipsis,
                    {
                      ellipsis: {
                        expandable: true,
                        collapsible: true,
                      },
                    },
                    { default: () => longText },
                  ),
              );
          },
        }),
      );

      await nextTick();
      const expandSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(expandSymbol.text()).toBe('More');

      await expandSymbol.trigger('click');
      await nextTick();

      const collapseSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.text()).toBe('Less');
    });
  });
});
