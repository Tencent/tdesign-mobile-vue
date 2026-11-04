import { h, defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { afterAll, beforeAll, describe, it, expect, vi } from 'vitest';
import Ellipsis from '../ellipsis';
import ConfigProvider from '../../config-provider';

const prefix = 't';
const COMPONENT_NAME = `${prefix}-typography`;

const longText =
  'TDesign 秉承开放的设计理念从创立之初就采用开源协作的方式进行设计和开发。协作方案讨论、组件设计以及 API 设计，包括源代码在内均在公司内部完全开放，赢得了内部开发者和设计师的广泛关注。TDesign 遵循平等、开放、严格的原则，不论参与者的角色如何。';

const CLAMP_STORE = '__webkitLineClamp';

describe('Ellipsis', () => {
  beforeAll(() => {
    // jsdom 的 cssstyle 不支持 -webkit-line-clamp，注入存取器以便断言省略行数
    Object.defineProperty(CSSStyleDeclaration.prototype, 'WebkitLineClamp', {
      configurable: true,
      get(this: CSSStyleDeclaration) {
        return (this as any)[CLAMP_STORE] ?? '';
      },
      set(this: CSSStyleDeclaration, value: unknown) {
        (this as any)[CLAMP_STORE] = String(value);
      },
    });
  });

  afterAll(() => {
    Reflect.deleteProperty(CSSStyleDeclaration.prototype, 'WebkitLineClamp');
  });

  describe('props', () => {
    it('content[string]', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: true,
          content: longText,
        },
      });
      expect(wrapper.text()).toBe(longText);
    });

    // 源码未实现：ellipsis.tsx 仅读取 content 属性与 default 插槽，未读取 default 属性（未传 content 与插槽时甚至会因缺少插槽而抛错）
    it.todo('default[string]');

    // 源码未实现：ellipsis.tsx 仅读取 content 属性与 default 插槽，未读取 default 属性（未传 content 与插槽时甚至会因缺少插槽而抛错）
    it.todo('default[function]');

    it('ellipsis[boolean]', () => {
      const ellipsisWrapper = mount(Ellipsis, {
        props: { ellipsis: true },
        slots: { default: () => longText },
      });
      // 容器为 flex 布局，内容 p 应用单行省略样式
      const container = ellipsisWrapper.element as HTMLElement;
      expect(container.style.display).toBe('flex');
      expect(container.style.alignItems).toBe('flex-end');
      const pEl = ellipsisWrapper.find('p');
      expect(pEl.exists()).toBe(true);
      expect(pEl.element.style.overflow).toBe('hidden');
      expect(pEl.element.style.textOverflow).toBe('ellipsis');
      expect(pEl.element.style.whiteSpace).toBe('normal');
      expect(pEl.element.style.display).toBe('-webkit-box');
      expect((pEl.element.style as any).WebkitLineClamp).toBe('1');

      const plainWrapper = mount(Ellipsis, {
        props: { ellipsis: false },
        slots: { default: () => longText },
      });
      expect(plainWrapper.find('p').element.getAttribute('style')).toBe(null);
    });

    it('ellipsis[object] row[number]', () => {
      const wrapper = mount(Ellipsis, {
        props: { ellipsis: { row: 3 } },
        slots: { default: () => longText },
      });
      const pEl = wrapper.find('p');
      expect(pEl.element.style.overflow).toBe('hidden');
      expect((pEl.element.style as any).WebkitLineClamp).toBe('3');
    });

    it('ellipsis[object] expandable[true/false]', () => {
      const expandableWrapper = mount(Ellipsis, {
        props: { ellipsis: { expandable: true } },
        slots: { default: () => longText },
      });
      const symbol = expandableWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.text()).toBe('展开');
      expect((symbol.element as HTMLElement).style.marginRight).toBe('0px');

      const collapsedWrapper = mount(Ellipsis, {
        props: { ellipsis: { expandable: false } },
        slots: { default: () => longText },
      });
      expect(collapsedWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
    });

    it('ellipsis[object] collapsible[true/false]', async () => {
      const collapsibleWrapper = mount(Ellipsis, {
        props: { ellipsis: { expandable: true, collapsible: true } },
        slots: { default: () => longText },
      });

      // 展开后内容样式恢复完整展示，按钮切换为「收起」
      await collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      await nextTick();
      const collapseSymbol = collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.exists()).toBe(true);
      expect(collapseSymbol.text()).toBe('收起');
      const expandedPEl = collapsibleWrapper.find('p');
      expect(expandedPEl.element.style.overflow).toBe('visible');
      expect(expandedPEl.element.style.display).toBe('initial');

      // 收起后恢复省略样式与「展开」按钮
      await collapseSymbol.trigger('click');
      await nextTick();
      expect(collapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).text()).toBe('展开');
      expect(collapsibleWrapper.find('p').element.style.overflow).toBe('hidden');

      const unCollapsibleWrapper = mount(Ellipsis, {
        props: { ellipsis: { expandable: true, collapsible: false } },
        slots: { default: () => longText },
      });
      await unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).trigger('click');
      await nextTick();
      // collapsible 为 false 时展开后不再出现按钮，内容保持完整展示
      expect(unCollapsibleWrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`).exists()).toBe(false);
      expect(unCollapsibleWrapper.find('p').element.style.overflow).toBe('visible');
    });

    it('ellipsis[object] suffix[function]', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            suffix: (h: any, { expanded }: any) => h('span', { class: 'my-suffix' }, expanded ? '收起' : '展开更多'),
          },
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.find('.my-suffix').exists()).toBe(true);
      expect(symbol.text()).toBe('展开更多');
    });

    it('ellipsis[object] suffix[vnode]', () => {
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: {
            expandable: true,
            // 运行时支持 VNode 后缀（类型声明仅包含 TNode 函数，需断言）
            suffix: h('span', { class: 'static-suffix' }, '查看更多') as any,
          },
        },
        slots: { default: () => longText },
      });

      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect(symbol.find('.static-suffix').exists()).toBe(true);
      expect(symbol.text()).toBe('查看更多');
    });

    it('renderCopy[function]', () => {
      const renderCopy = () => h('span', { class: 'copy-btn' }, '复制');
      const wrapper = mount(Ellipsis, {
        props: {
          ellipsis: { expandable: true },
          renderCopy,
        },
        slots: { default: () => longText },
      });
      expect(wrapper.find('.copy-btn').exists()).toBe(true);
      // 存在复制按钮时展开按钮预留右边距
      const symbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(symbol.exists()).toBe(true);
      expect((symbol.element as HTMLElement).style.marginRight).toBe('8px');
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
      expect(wrapper.find('p').text()).toBe(longText);
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

      const expandSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(expandSymbol.text()).toBe('More');

      await expandSymbol.trigger('click');
      await nextTick();

      const collapseSymbol = wrapper.find(`.${COMPONENT_NAME}-ellipsis-symbol`);
      expect(collapseSymbol.text()).toBe('Less');
    });
  });
});
