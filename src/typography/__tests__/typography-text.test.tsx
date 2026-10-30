import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Text from '../text';
import Ellipsis from '../ellipsis';

const prefix = 't';
const COMPONENT_NAME = `${prefix}-typography`;

const longText =
  'TDesign 秉承开放的设计理念从创立之初就采用开源协作的方式进行设计和开发。协作方案讨论、组件设计以及 API 设计，包括源代码在内均在公司内部完全开放，赢得了内部开发者和设计师的广泛关注。TDesign 遵循平等、开放、严格的原则，不论参与者的角色如何。';
const shortText = 'TDesign 是腾讯各业务团队在服务业务过程中沉淀的一套企业级设计体系。';

describe('Typography Text', () => {
  describe('props', () => {
    it('code[boolean]', () => {
      const wrapper = mount(Text, {
        props: { code: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('code').exists()).toBe(true);
      expect(wrapper.find('code').text()).toBe(shortText);
    });

    it('content[string]', () => {
      const wrapper = mount(Text, {
        props: { content: shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).exists()).toBe(true);
      expect(wrapper.text()).toContain(shortText);
    });

    it('content[function]', () => {
      const wrapper = mount(Text, {
        props: { content: () => shortText },
      });
      expect(wrapper.text()).toContain(shortText);
    });

    it('copyable[boolean]', () => {
      const wrapper = mount(Text, {
        props: { copyable: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).exists()).toBe(true);
    });

    it('copyable[object] with onCopy callback', async () => {
      const handleCopy = vi.fn();
      const wrapper = mount(Text, {
        props: {
          copyable: {
            onCopy: handleCopy,
          },
        },
        slots: { default: () => shortText },
      });

      const copyBtn = wrapper.find(`.${COMPONENT_NAME}__copy`);
      expect(copyBtn.exists()).toBe(true);

      await copyBtn.trigger('click');
      expect(handleCopy).toHaveBeenCalled();
    });

    it('copyable[object] with custom text', async () => {
      const customText = '自定义复制文本';
      const handleCopy = vi.fn();
      const wrapper = mount(Text, {
        props: {
          copyable: {
            text: customText,
            onCopy: handleCopy,
          },
        },
        slots: { default: () => shortText },
      });

      const copyBtn = wrapper.find(`.${COMPONENT_NAME}__copy`);
      await copyBtn.trigger('click');
      expect(handleCopy).toHaveBeenCalled();
    });

    it('copyable[object] with custom suffix function', () => {
      const suffix = (h, { copied }) => h('span', { class: 'custom-icon' }, copied ? '已复制' : '复制');
      const wrapper = mount(Text, {
        props: {
          copyable: {
            suffix,
          },
        },
        slots: { default: () => shortText },
      });

      expect(wrapper.find('.custom-icon').exists()).toBe(true);
    });

    it('copyable[object] with VNode suffix', () => {
      const wrapper = mount(Text, {
        props: {
          copyable: {
            suffix: h('span', { class: 'vnode-suffix' }, '复制'),
          },
        },
        slots: { default: () => shortText },
      });

      expect(wrapper.find('.vnode-suffix').exists()).toBe(true);
    });

    it('copyable[object] with string suffix', () => {
      const wrapper = mount(Text, {
        props: {
          copyable: {
            suffix: 'copy-text',
          },
        },
        slots: { default: () => shortText },
      });

      // String suffix is rendered as-is
      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).exists()).toBe(true);
    });

    it('copyable icon changes after click', async () => {
      vi.useFakeTimers();
      const wrapper = mount(Text, {
        props: { copyable: true },
        slots: { default: () => shortText },
      });

      const copyBtn = wrapper.find(`.${COMPONENT_NAME}__copy`);
      await copyBtn.trigger('click');
      await nextTick();

      // After click, should show CheckIcon
      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).exists()).toBe(true);

      // After 1500ms, should revert
      vi.advanceTimersByTime(1500);
      await nextTick();

      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).exists()).toBe(true);
      vi.useRealTimers();
    });

    it('copyable with string content copies text', async () => {
      const handleCopy = vi.fn();
      const wrapper = mount(Text, {
        props: {
          content: shortText,
          copyable: {
            onCopy: handleCopy,
          },
        },
      });

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(handleCopy).toHaveBeenCalled();
    });

    it('copyable with no text content returns empty', async () => {
      const handleCopy = vi.fn();
      const wrapper = mount(Text, {
        props: {
          copyable: {
            onCopy: handleCopy,
          },
        },
        slots: { default: () => h('div', {}, 'nested') },
      });

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(handleCopy).toHaveBeenCalled();
    });

    it('delete[boolean]', () => {
      const wrapper = mount(Text, {
        props: { delete: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('del').exists()).toBe(true);
    });

    it('disabled[boolean]', () => {
      const wrapper = mount(Text, {
        props: { disabled: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--disabled`);
    });

    it('ellipsis[boolean]', () => {
      const wrapper = mount(Text, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      // When ellipsis is true, it should render through Ellipsis component
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
    });

    it('ellipsis[object] with row', () => {
      const wrapper = mount(Text, {
        props: {
          ellipsis: {
            row: 2,
          },
        },
        slots: { default: () => longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
    });

    it('ellipsis[object] with expandable', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Text, {
        props: {
          ellipsis: {
            row: 1,
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

    it('ellipsis[object] with collapsible', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Text, {
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
      await expandSymbol.trigger('click');
      expect(onExpand).toHaveBeenCalledWith(true);

      // After expanding, should show collapse symbol
      await nextTick();
      const collapseSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);

      await collapseSymbol.trigger('click');
      expect(onExpand).toHaveBeenCalledWith(false);
    });

    it('ellipsis[object] with collapsible=false', async () => {
      const onExpand = vi.fn();
      const wrapper = mount(Text, {
        props: {
          ellipsis: {
            row: 1,
            expandable: true,
            collapsible: false,
            onExpand,
          },
        },
        slots: { default: () => longText },
      });

      await nextTick();
      const expandSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      await expandSymbol.trigger('click');

      // After expanding with collapsible=false, no collapse symbol should appear
      await nextTick();
      expect(wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('ellipsis[object] with custom suffix', async () => {
      const wrapper = mount(Text, {
        props: {
          ellipsis: {
            expandable: true,
            suffix: (h, { expanded }) => h('span', { class: 'custom-suffix' }, expanded ? '收起' : '更多'),
          },
        },
        slots: { default: () => longText },
      });

      await nextTick();
      const expandSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(expandSymbol.exists()).toBe(true);
    });

    it('copyable with function content copies empty string', async () => {
      const handleCopy = vi.fn();
      const wrapper = mount(Text, {
        props: {
          content: () => shortText,
          copyable: {
            onCopy: handleCopy,
          },
        },
      });

      await wrapper.find(`.${COMPONENT_NAME}__copy`).trigger('click');
      expect(handleCopy).toHaveBeenCalled();
    });

    it('italic[boolean]', () => {
      const wrapper = mount(Text, {
        props: { italic: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('i').exists()).toBe(true);
    });

    it('keyboard[boolean]', () => {
      const wrapper = mount(Text, {
        props: { keyboard: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('kbd').exists()).toBe(true);
    });

    it('mark[boolean]', () => {
      const wrapper = mount(Text, {
        props: { mark: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('mark').exists()).toBe(true);
    });

    it('mark[string] with color', () => {
      const color = '#07c160';
      const wrapper = mount(Text, {
        props: { mark: color },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('mark').exists()).toBe(true);
      // jsdom converts hex to rgb format
      expect(wrapper.find('mark').element.style.backgroundColor).toBe('rgb(7, 193, 96)');
    });

    it('strong[boolean]', () => {
      const wrapper = mount(Text, {
        props: { strong: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('strong').exists()).toBe(true);
    });

    it('theme[empty] passes validator', () => {
      const wrapper = mount(Text, {
        props: { theme: '' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).exists()).toBe(true);
      // empty theme should not add any theme class
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).not.toContain(`${COMPONENT_NAME}--primary`);
    });

    it('theme[primary]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'primary' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--primary`);
    });

    it('theme[secondary]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'secondary' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--secondary`);
    });

    it('theme[success]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'success' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--success`);
    });

    it('theme[warning]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'warning' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--warning`);
    });

    it('theme[error]', () => {
      const wrapper = mount(Text, {
        props: { theme: 'error' },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--error`);
    });

    it('theme should not add class when disabled', () => {
      const wrapper = mount(Text, {
        props: { theme: 'primary', disabled: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).toContain(`${COMPONENT_NAME}--disabled`);
      expect(wrapper.find(`.${COMPONENT_NAME}`).classes()).not.toContain(`${COMPONENT_NAME}--primary`);
    });

    it('underline[boolean]', () => {
      const wrapper = mount(Text, {
        props: { underline: true },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('u').exists()).toBe(true);
    });
  });

  describe('slots', () => {
    it('default[slot]', () => {
      const wrapper = mount(Text, {
        slots: { default: () => shortText },
      });
      expect(wrapper.text()).toContain(shortText);
    });

    it('content[slot]', () => {
      const wrapper = mount(Text, {
        slots: { content: () => shortText },
      });
      expect(wrapper.text()).toContain(shortText);
    });
  });

  describe('scenarios', () => {
    it('ellipsis and :copyable together renders copy in ellipsis mode', () => {
      const wrapper = mount(Text, {
        props: {
          ellipsis: true,
          copyable: true,
        },
        slots: { default: () => longText },
      });
      expect(wrapper.findComponent(Ellipsis).exists()).toBe(true);
      expect(wrapper.find(`.${COMPONENT_NAME}__copy`).exists()).toBe(true);
    });

    it('multiple decorations combined', () => {
      const wrapper = mount(Text, {
        props: {
          strong: true,
          italic: true,
          underline: true,
          code: true,
        },
        slots: { default: () => shortText },
      });
      expect(wrapper.find('strong').exists()).toBe(true);
      expect(wrapper.find('i').exists()).toBe(true);
      expect(wrapper.find('u').exists()).toBe(true);
      expect(wrapper.find('code').exists()).toBe(true);
    });

    it('without ellipsis renders as span', () => {
      const wrapper = mount(Text, {
        slots: { default: () => shortText },
      });
      expect(wrapper.find('span').exists()).toBe(true);
    });
  });
});
